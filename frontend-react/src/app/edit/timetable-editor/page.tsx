'use client';
import React, { useState, useEffect } from 'react';
import TeacherSubjectTable from '@/components/timetable/teacherSubjectDataTable/teachersubjectdatatable';
import TimetableTable from '@/components/timetable/timetableTable/timetabletable';
import { fetch_timetable, save_timetable_editor_automation } from '@/utils/fetchtimetable';
import { fetch_all_faculty } from '@/utils/fetchfaculty';
import { fetch_all_rooms } from '@/utils/fetchroom';
import Header from '@/components/header';
import { timetable_schema } from '@/models/timetable.model';
import { faculty_schema } from '@/models/faculty.model';
import { room_schema } from '@/models/room.model';
import DynamicOptions from '@/components/DynamicOptions';
import Footer from '@/components/footer';
import { toast } from 'react-hot-toast';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const timeSlots = ['08-09', '09-10', '10-11', '11-12', '12-01', '01-02', '02-03', '03-04', '04-05', '05-06'];

const TimetableEditor = () => {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [facultyData, setFacultyData] = useState<faculty_schema[] | null>(null);
  const [roomList, setRoomList] = useState<room_schema[] | null>(null);
  const [timetable, setTimetable] = useState<timetable_schema | null>(null);
  const [timetable2, setTimetable2] = useState<timetable_schema>();

  useEffect(() => {
    validateTeacherSubject(false);
  }, [timetable]);

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

  const updateCounter = () => {
    if (!timetable) return;

    const teacherSubjectData = timetable.teacher_subject_data;
    const schedule = timetable.schedule;

    const newTeacherSubjectData = teacherSubjectData.map(subject => {
      let count = 0;
      for (const day in schedule) {
        for (const slot in timeSlots) {
          if (schedule[day][slot].subjectcode === subject.subjectcode) {
            count++;
          }
        }
      }
      return { ...subject, allocated_hrs: count };
    });

    // const newTimetable = { ...timetable, teacher_subject_data: newTeacherSubjectData };
    // setTimetable(newTimetable as timetable_schema);
  };

  const validateTeacherSubject = (flag = false): boolean => {
    let isValid = true;
    if (!timetable || !roomList || !facultyData) return false;
    // Loop over days and slots
    for (const day of days.map(d => d.toLowerCase())) {
      for (const slot of timeSlots) {
        const cell = timetable.schedule[day][slot];
        const teacher = timetable.teacher_subject_data.find(t => t.subjectcode === cell.subjectcode);
        // toast.success(cell.subjectcode);
        if (!cell || cell.roomid === "0" || cell.subjectcode === "") {
          continue; // empty slot
        }

        const room = roomList.find(r => r.roomid === cell.class_id);
        if (!room) continue;
        // console.log(room);

        const roomSlot = room.schedule[day][slot];

        // --- Room Conflict Checks ---
        if (roomSlot.section.length > 0) {
          // Subject conflict
          if (roomSlot.section.includes(section)) continue;
          // console.log(roomSlot);
          if (roomSlot.subjectcode !== cell.subjectcode) {
            toast.error(
              `Room Conflict: ${room.name} already has ${roomSlot.subjectcode} on ${day} ${slot}`
            );
            isValid = false;
          }

          // Teacher conflict
          if (roomSlot.teacherid !== teacher?.teacherid) {
            toast.error(
              `Room Conflict: ${room.name} has ${roomSlot.teacherid} but you assigned ${teacher?.teacherid} on ${day} ${slot}`
            );
            isValid = false;
          }

          // Merge case
          if (
            roomSlot.subjectcode === cell.subjectcode &&
            roomSlot.teacherid === teacher?.teacherid
            && flag === true
          ) {
            toast(
              `Merge Warning: ${day.toUpperCase()} ${slot} in ${room.name}`,
              {
                icon: '⚠️',
                style: {
                  // borderRadius: '8px',
                  background: '#fffbe6',
                  // color: '#ad8b00',
                  border: '1.5px solid #ffe58f',
                  // fontWeight: 'bold'
                }
              }
            );
          }
        }

        // --- Teacher Conflict Checks (against timetable itself) ---
        for (const teacher of Object.values(timetable.teacher_subject_data)) {
          if (teacher.teacherid === cell.teacherid) {
            const teachSlot = teacher.schedule[day][slot];

            if (
              teachSlot.subjectcode &&
              !(teachSlot.subjectcode === cell.subjectcode && teachSlot.roomid === cell.roomid)
            ) {
              toast.error(
                `Teacher Conflict: ${teacher.teacherid} is already teaching ${teachSlot.subjectcode} at ${day} ${slot}`
              );
              isValid = false;
            }
          }
        }

      }
    }
    toast.success(isValid ? "No conflicts found!" : "Conflicts found!");

    return isValid;
  }

  const save_timetable_func_all = async () => {
    if (validateTeacherSubject(true)) {
      const res = await save_timetable_editor_automation(timetable!);
      console.log(res);
      if (res) {
        toast.success("Timetable saved successfully!");
        let timetable_parsed = JSON.parse(JSON.stringify(timetable));
        timetable_parsed.schedule = res.schedule;
        timetable_parsed.teacher_subject_data = res.teacher_subject_data;
        setTimetable(timetable_parsed);
        setTimetable2(timetable_parsed);
        setFacultyData(res.updatedFaculty);
        setRoomList(res.updatedRooms);
        localStorage.setItem('facultyList', JSON.stringify(res.updatedFaculty));
        localStorage.setItem('room_list', JSON.stringify(res.updatedRooms));
        localStorage.setItem('timetableData', JSON.stringify(timetable_parsed));
        localStorage.setItem('course', timetable_parsed.course);
        localStorage.setItem('semester', timetable_parsed.semester);
        localStorage.setItem('section', timetable_parsed.section);
      }
    }
  }

  const fetch_all_data = async () => {
    const timetableData = await fetch_timetable(course, semester, section);
    setTimetable(timetableData);
    setTimetable2(timetableData);

    const facultyData = await fetch_all_faculty();
    setFacultyData(facultyData);

    let roomData = await fetch_all_rooms();
    roomData = roomData.filter((room: room_schema) => room.allowed_course.includes(course));
    setRoomList(roomData);
  };
  useEffect(() => {
    fetch_all_data();
  }, [section, semester, course]);

  return (
    <>
      <title>Class-Sync | Editing Portal</title>
      <Header />
      <style></style>
      <div className="container text-center">
        <button type="button" className="button" onClick={() => {
          validateTeacherSubject();
        }}>
          <div className="button-top-red h5"><b>Test</b></div>
          <div className="button-bottom-red"></div>
        </button>
      </div>
      <section className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Timetable Editing Portal - Set Faculty Data</h1>
          <div className="row mt-3">
            <div className="md-col-9 col-10">
              <DynamicOptions course={course} setCourse={setCourse} semester={semester} setSemester={setSemester} section={section} setSection={setSection} />
            </div>
            <div className="md-col-2 col-1 my-3 px-0">
              <button
                type="button"
                className="text d-flex align-items-center justify-content-center py-2 px-3 gap-2 h-full w-full"
                title="Reset selection"
                onClick={() => fetch_all_data()}
                style={{
                  borderRadius: '8px',
                  border: '1.5px solid #ccc',
                }}
              >
                <span className='font-bold text-xl'>Fetch</span>
              </button>
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
          <button type="button" className="button" onClick={save_timetable_func_all}>
            <div className="button-top-red h5"><b>Save Timetable</b></div>
            <div className="button-bottom-red"></div>
          </button>
          <button type="button" className="button" onClick={() => validateTeacherSubject(true)}>
            <div className="button-top-blue h5"><b>Validate Timetable</b></div>
            <div className="button-bottom-blue"></div>
          </button>
        </div>

        <div className="container mt-3">
          <TeacherSubjectTable timetable={timetable} />
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