'use client';
import React, { useState, useEffect } from 'react';
import TeacherSubjectTable from '@/components/timetable/teacherSubjectDataTable/teachersubjectdatatable';
import TimetableTable from '@/components/timetable/timetableTable/timetabletable';
import { fetch_timetable, save_timetable } from '@/utils/fetchtimetable';
import { fetch_all_faculty, save_faculty_list } from '@/utils/fetchfaculty';
import { fetch_all_rooms, save_all_rooms } from '@/utils/fetchroom';
import Header from '@/components/header';
import { timetable_schema } from '@/models/timetable.model';
import { faculty_schema } from '@/models/faculty.model';
import { room_schema } from '@/models/room.model';
import DynamicOptions from '@/components/DynamicOptions';
import Footer from '@/components/footer';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const timeSlots = ['08-09', '09-10', '10-11', '11-12', '12-01', '01-02', '02-03', '03-04', '04-05', '05-06'];

const TimetableEditor = () => {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [facultyData, setFacultyData] = useState<faculty_schema[] | null>(null);
  const [roomList, setRoomList] = useState<room_schema[] | null>(null);
  const [timetable, setTimetable] = useState<timetable_schema | null>(null);

  const handleCellChange = (day: string, slot: string, type: string, value: string) => {
    const newTimetable = JSON.parse(JSON.stringify(timetable));
    if (type === 'subject') {
      newTimetable.schedule[day.toLowerCase()][slot].subjectcode = value;
    } else if (type === 'room') {
      newTimetable.schedule[day.toLowerCase()][slot].class_id = value;
    }
    setTimetable(newTimetable);
  };

  const handleCopy = (row: number, col: number, direction: string) => {
    const newTimetable = JSON.parse(JSON.stringify(timetable));
    const day = Object.keys(newTimetable.schedule)[row];
    const slot = Object.keys(newTimetable.schedule[day])[col];
    const prevSlot = Object.keys(newTimetable.schedule[day])[col - 1];
    const nextSlot = Object.keys(newTimetable.schedule[day])[col + 1];

    if (direction === 'left') {
      newTimetable.schedule[day][slot].subjectcode = newTimetable.schedule[day][prevSlot].subjectcode;
      newTimetable.schedule[day][slot].class_id = newTimetable.schedule[day][prevSlot].class_id;
    } else if (direction === 'right') {
      newTimetable.schedule[day][slot].subjectcode = newTimetable.schedule[day][nextSlot].subjectcode;
      newTimetable.schedule[day][slot].class_id = newTimetable.schedule[day][nextSlot].class_id;
    }
    setTimetable(newTimetable);
  };

  const handleReset = (row: number, col: number) => {
    const newTimetable = JSON.parse(JSON.stringify(timetable));
    const day = Object.keys(newTimetable.schedule)[row];
    const slot = Object.keys(newTimetable.schedule[day])[col];
    newTimetable.schedule[day][slot].subjectcode = '';
    newTimetable.schedule[day][slot].class_id = '0';
    setTimetable(newTimetable);
  };

  const reset_table = async () => {
    if (confirm("Are you sure you want to reset the timetable? This action cannot be undone.")) {
      const newTimetable = JSON.parse(JSON.stringify(timetable));
      for (const day of days.map(d => d.toLowerCase())) {
        for (const slot of timeSlots) {
          newTimetable.schedule[day][slot].subjectcode = '';
          newTimetable.schedule[day][slot].class_id = '0';
        }
      }
      setTimetable(newTimetable);
    }
  };

  const save_timetable_func = async () => {
    await save_timetable(timetable!);
  };

  const updateCounter = () => {
    if (!timetable) return;

    const teacherSubjectData = timetable.teacher_subject_data;
    const schedule = timetable.schedule;

    const newTeacherSubjectData = teacherSubjectData.map(subject => {
      let count = 0;
      for (const day in schedule) {
        for (const slot in schedule[day]) {
          if (schedule[day][slot].subjectcode === subject.subjectcode) {
            count++;
          }
        }
      }
      return { ...subject, allocated_hrs: count };
    });

    const newTimetable = { ...timetable, teacher_subject_data: newTeacherSubjectData };
    setTimetable(newTimetable as timetable_schema);
  };

  const validateTeacherSubject = () => {
    updateCounter();
    let isValid = true;

    for (const day in timetable!.schedule) {
      for (const slot in timetable!.schedule[day]) {
        const cell = timetable!.schedule[day][slot];
        const subjectCode = cell.subjectcode;
        const roomId = cell.class_id;

        if (roomId === '0' || subjectCode === '') {
          continue;
        }

        const room = roomList!.find(r => r.roomid === roomId);
        if (room) {
          const roomSchedule = room.schedule[day][slot];
          const teacherId = timetable!.teacher_subject_data.find(t => t.subjectcode === subjectCode)?.teacherid;

          if (!teacherId || teacherId === '0') {
            continue;
          }

          if (roomSchedule.section.length > 0) {
            if (roomSchedule.subjectcode !== subjectCode) {
              isValid = false;
            }
            if (roomSchedule.teacherid !== teacherId) {
              isValid = false;
            }
          }

          const faculty = facultyData!.find(f => f.teacherid === teacherId);
          if (faculty) {
            const teacherSchedule = faculty.schedule[day][slot];
            if (teacherSchedule.subjectcode && teacherSchedule.subjectcode !== subjectCode) {
              isValid = false;
            }
          }
        }
      }
    }
    return isValid;
  };

  const fixtime_firstphase = () => {
    const newTimetable = JSON.parse(JSON.stringify(timetable));
    const newRoomList = JSON.parse(JSON.stringify(roomList));
    const newFacultyData = JSON.parse(JSON.stringify(facultyData));

    for (const day in newTimetable.schedule) {
      for (const slot in newTimetable.schedule[day]) {
        const cell = newTimetable.schedule[day][slot];
        const subjectCode = cell.subjectcode;
        const roomId = cell.class_id;

        if (roomId !== '0') {
          const room = newRoomList.find((r: any) => r.roomid === roomId);
          if (room) {
            const roomSchedule = room.schedule[day][slot];
            if (roomSchedule.section.length > 0) {
              if (roomSchedule.section.length === 1) {
                roomSchedule.course = "";
                roomSchedule.semester = "";
                roomSchedule.subjectcode = "";
                roomSchedule.teacherid = "";
                roomSchedule.section = [];
              } else if (roomSchedule.section.length > 1) {
                roomSchedule.section = roomSchedule.section.filter((section: any) => section !== timetable!.section);
              }
            }
          }
        }

        if (subjectCode !== '') {
          const teacherId = newTimetable.teacher_subject_data.find((t: any) => t.subjectcode === subjectCode)?.teacherid;
          if (teacherId) {
            const faculty = newFacultyData.find((f: any) => f.teacherid === teacherId);
            if (faculty) {
              const teacherSchedule = faculty.schedule[day][slot];
              if (teacherSchedule.section.length > 0) {
                if (teacherSchedule.section.length === 1) {
                  teacherSchedule.section = [];
                  teacherSchedule.subjectcode = "";
                  teacherSchedule.course = "";
                  teacherSchedule.semester = "";
                  teacherSchedule.roomid = [];
                } else if (teacherSchedule.section.length > 1) {
                  teacherSchedule.section = teacherSchedule.section.filter((section: any) => section !== timetable!.section);
                }
              }
            }
          }
        }
      }
    }
    setTimetable(newTimetable);
    setRoomList(newRoomList);
    setFacultyData(newFacultyData);
  };

  const fixtime_secondphase = () => {
    const newTimetable = JSON.parse(JSON.stringify(timetable));
    const newRoomList = JSON.parse(JSON.stringify(roomList));
    const newFacultyData = JSON.parse(JSON.stringify(facultyData));

    for (const day in newTimetable.schedule) {
      for (const slot in newTimetable.schedule[day]) {
        const cell = newTimetable.schedule[day][slot];
        const subjectCode = cell.subjectcode;
        const roomId = cell.class_id;

        if (roomId !== '0') {
          const room = newRoomList.find((r: any) => r.roomid === roomId);
          if (room) {
            const roomSchedule = room.schedule[day][slot];
            if (roomSchedule.section.length === 0) {
              roomSchedule.teacherid = newTimetable.teacher_subject_data.find((x: any) => x.subjectcode === subjectCode).teacherid;
              roomSchedule.subjectcode = subjectCode;
              roomSchedule.section.push(newTimetable.section);
              roomSchedule.semester = newTimetable.semester;
              roomSchedule.course = newTimetable.course;
            } else if (roomSchedule.section.length > 0) {
              roomSchedule.section.push(newTimetable.section);
            }
          }
        }

        if (subjectCode !== '') {
          const teacherId = newTimetable.teacher_subject_data.find((t: any) => t.subjectcode === subjectCode)?.teacherid;
          if (teacherId) {
            const faculty = newFacultyData.find((f: any) => f.teacherid === teacherId);
            if (faculty) {
              const teacherSchedule = faculty.schedule[day][slot];
              if (teacherSchedule.section.length > 0) {
                teacherSchedule.section.push(newTimetable.section);
              } else if (teacherSchedule.section.length === 0) {
                teacherSchedule.section = [newTimetable.section];
                teacherSchedule.subjectcode = subjectCode;
                teacherSchedule.course = newTimetable.course;
                teacherSchedule.semester = newTimetable.semester;
                teacherSchedule.roomid = [roomId];
              }
            }
          }
        }
      }
    }
    setTimetable(newTimetable);
    setRoomList(newRoomList);
    setFacultyData(newFacultyData);
  };


  const fetch_all_data = async () => {
    const timetableData = await fetch_timetable(course, semester, section);
    setTimetable(timetableData);

    const facultyData = await fetch_all_faculty();
    setFacultyData(facultyData);

    let roomData = await fetch_all_rooms();
    roomData = roomData.filter((room: room_schema) => room.allowed_course.includes(course));
    setRoomList(roomData);
  };

  useEffect(() => {
    fetch_all_data();
  }, [course, semester, section]);


  return (
    <>
      <title>Class-Sync | Editing Portal</title>
      <Header />
      <style></style>

      <section className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Timetable Editing Portal - Set Faculty Data</h1>
          <div className="row mt-3">
            <div className="col-11">
              <DynamicOptions course={course} setCourse={setCourse} semester={semester} setSemester={setSemester} section={section} setSection={setSection} />
            </div>
            <div className="col-1 mt-3">
              <button type="button" className="button" onClick={async () => { await reset_table(); }}>
                <div className="button-top-blue h5 fw-bold"><b>RESET</b></div>
                <div className="button-bottom-blue"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-3">
          <TimetableTable timetable={timetable} roomList={roomList} onCellChange={handleCellChange} onCopy={handleCopy} onReset={handleReset} />
        </div>

        <div className="container text-center">
          <button type="button" className="button" onClick={save_timetable_func}>
            <div className="button-top-red h5"><b>Save Timetable</b></div>
            <div className="button-bottom-red"></div>
          </button>
        </div>

        <div className="container mt-3">
          <TeacherSubjectTable teacherSubjectData={timetable ? timetable.teacher_subject_data : null} />
        </div>

        <div className="container text-center">
          <table className="mt-5">
            <tbody >
              <tr className="bg-light text-dark border-3 border-dark fw-bold h3 align-middle text-center">
                <td className="p-2 border-3 border-dark fw-bold h4" colSpan={6}>Notes and Info</td>
              </tr>
              <tr>
                <td className="p-4 border-3 border-light fw-bold h4 bg-success text-light ">1</td>
                <td className="p-4 border-3 border-light fw-bold h4 bg-primary text-light ">2</td>
                <td className="p-4 border-3 border-light fw-bold h4 bg-warning text-dark ">3</td>
                <td className="p-4 border-3 border-light fw-bold h4 bg-danger text-light ">4</td>
                <td className="p-4 border-3 border-light fw-bold h4 bg-dark text-light ">4</td>
                <td className="p-4 border-3 border-dark fw-bold h4 bg-light text-dark ">number of sections in a room</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TimetableEditor;