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
    toast.success("something");
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

  const validateTeacherSubject2 = () => {//ai wala hai ye  not working properly
    // updateCounter();
    let isValid = true;

    if (!timetable) return true;
    for (const day of days) {
      for (const slot of timeSlots) {
        const dayKey = day.toLowerCase();
        const slotKey = slot;
        const cell = timetable.schedule[dayKey][slotKey];
        const subjectCode = cell.subjectcode;
        const roomId = cell.class_id;

        if (roomId === '0' || subjectCode === '') {
          continue;
        }

        const room = roomList!.find(r => r.roomid === roomId);
        if (room) {
          const roomSchedule = room.schedule[dayKey][slotKey];
          const teacherId = timetable!.teacher_subject_data.find(t => t.subjectcode === subjectCode)?.teacherid;

          if (!teacherId || teacherId === '0') {
            continue;
          }

          if (roomSchedule.section.length > 0) {
            if (roomSchedule.subjectcode !== subjectCode) {
              toast.error(`Type 1 - Room conflict <br>Diffrent Subject Conflicted at ${day.toUpperCase()} ${slot} slot. Another class is allotted ${roomSchedule.subjectcode} as subject in this slot already.<br>[ Choose another class if the subject is diffrent ]`);
              isValid = false;
            }
            if (roomSchedule.teacherid !== teacherId) {
              toast.error(`Type 2 - Room conflict <br>Teacher Conflicted at ${day.toUpperCase()} ${slot} slot [ ${roomSchedule.teacherid} ] is teaching ${roomSchedule.subjectcode} in this slot. <br>[ Choose another class if the teacher is diffrent ]`);
              isValid = false;
            }
          }

          const faculty = facultyData!.find(f => f.teacherid === teacherId);
          if (faculty) {
            const teacherSchedule = faculty.schedule[dayKey][slotKey];
            if (teacherSchedule.subjectcode && teacherSchedule.subjectcode !== subjectCode) {
              toast.error(`Type 11 tester- Teacher Conflict at ${day.toUpperCase()} ${slot} slot. Another class is allotted ${teacherSchedule.subjectcode} as subject in this slot already.`);
              isValid = false;
            }
          }
        }
      }
    }
    if (isValid) {
      toast.success("No conflicts found! Timetable is valid.");
    } else {
      toast.error("Conflicts found! Please review the timetable.");
    }
    return isValid;
  };

  const validateTeacherSubject = () => {					//  this function validates the teacher and subject data in the table and returns true if the data is valid else false
    // updateCounter();
    let mytable = timetable2;
    if (!mytable || !roomList || !facultyData) return false;

    let isValid = true;
    for (const day of days) {
      let currday = day.toLowerCase();
      for (const slot of timeSlots) {
        let currslot = slot;
        let curr_slot_room = mytable.schedule[currday][currslot].class_id;
        let subjectCode = mytable.schedule[currday][currslot].subjectcode;
        // Skip room with ID '0'
        if (curr_slot_room === '0' || subjectCode === '') {
          continue;
        }

        // Validate if the room exists in roomList
        for (let elementr in roomList) {
          if (roomList[elementr].roomid == curr_slot_room && curr_slot_room != '0') {
            let temproom = roomList[elementr].schedule[currday][currslot];
            // console.log("=====================================\n", curr_slot_room, subjectCode);


            let roomSchedule = roomList[elementr].schedule[currday][currslot];
            let teacherId = mytable.teacher_subject_data.find(x => x.subjectcode === subjectCode).teacherid;

            // Skip teacher with ID '0'
            if (!teacherId || teacherId === '0') {
              continue;
            }

            // Check if room has any assigned section
            if (roomSchedule.section.length > 0) {
              // Subject mismatch check
              if (roomSchedule.subjectcode !== subjectCode) {
                setTimeout(() => {
                  toast.error(`Type 1 - Room conflict <br>Diffrent Subject Conflicted at ${currday.toUpperCase()} ${currslot} slot Another class is allotted ${roomSchedule.subjectcode} as subject in this slot already.<br>[ Choose another class if the subject is diffrent ]`);
                }, 1000);
                isValid = false;
              }
              // Teacher mismatch check
              if (roomSchedule.teacherid !== teacherId) {
                setTimeout(() => {
                  toast.error(`Type 2 - Room conflict <br>Teacher Conflicted at ${currday.toUpperCase()} ${currslot} slot [ ${roomSchedule.teacherid} ] is teaching ${roomSchedule.subjectcode} in this slot. <br>[ Choose another class if the teacher is diffrent ]`);
                }, 2000);
                isValid = false;
              }
            }
            // Validate the teacher's schedule
            for (let element in facultyData) {
              if (facultyData[element].teacherid === teacherId) { // the teacher who is teaching the subject
                // console.log("========"+facultyData[element].teacherid, teacherId);
                let teacherSchedule = facultyData[element].schedule[currday][currslot];

                // If the teacher is assigned in the same slot
                if (teacherSchedule.subjectcode === subjectCode && teacherSchedule.section.length > 0) { // review this condition
                  if (teacherSchedule.section.includes(section) && teacherSchedule.section.length > 1) {
                    setTimeout(() => {
                      // toast.error(`${teacherSchedule.section.includes(section)} && ${teacherSchedule.section} ${currday} ${currs")
                      toast.error(`Merge at ${currday.toUpperCase()} ${currslot} `);
                    }, 500);
                  }
                  if (!teacherSchedule.section.includes(section) && teacherSchedule.section.length == 1) {
                    setTimeout(() => {
                      toast.error(`Merge at ${currday.toUpperCase()} ${currslot} `);
                    }, 500);
                  }
                  // isValid = false;
                }

                // If the teacher is teaching a different subject in the same slot
                if (teacherSchedule.subjectcode && teacherSchedule.subjectcode !== subjectCode) {
                  toast.error(`Type 11 tester- Teacher Conflict at ${currday.toUpperCase()} ${currslot} slot Another class is allotted ${teacherSchedule.subjectcode} as subject in this slot already.`);
                  isValid = false;
                }
                // if (teacherSchedule.section.length > 0) {
                // 	if (teacherSchedule.section.includes(section)) {
                // 		toast.error(`Type 22 tester - Teacher Conflict at ${currday.toUpperCase()} ${currslot} slot ${facultyData[element].name} [ ${facultyData[element].teacherid} ] is teaching ${teacherSchedule.subjectcode} in this slot. [ change your teacher or choose another class ]`);
                // 		isValid = false;
                // 	}
                // }
                let teachercurrroomnow = "[NA :: developing rn]";
                // let teachercurrroomnow = roomList.find(x => x.roomid === facultyData[element].schedule[currday][currslot].roomid[0]).name || "No Room Assigned";
                console.log(teachercurrroomnow);
                if (teacherSchedule.subjectcode !== "" && teacherSchedule.subjectcode !== subjectCode) {
                  toast.error(`Type 1 - Teacher Conflict at ${currday.toUpperCase()} ${currslot} slot ${facultyData[element].name} [ ${facultyData[element].teacherid} ] <br><i><b>( current teacher )</b></i> is teaching ${teachercurrroomnow} at the current time.`);
                  isValid = false;
                }
                if (roomList[elementr].roomid.length != 0 && teacherSchedule.roomid[0] && teacherSchedule.roomid[0] !== curr_slot_room) {
                  if (!teacherSchedule.section.includes(section)) {
                    toast.error(`Type 2 - Teacher Conflict at ${currday.toUpperCase()} ${currslot} slot ${facultyData[element].name} [ ${facultyData[element].teacherid} ] <br><i><b>( current teacher )</b></i> is teaching ${teacherSchedule.subjectcode} at ${teachercurrroomnow} at the current time.`); isValid = false;
                  }
                }
              }
            }
          }
        }

      }
    }
    return isValid;
  };

  const save_timetable_func_all = async () => {
    if (1) { // validateTeacherSubject()
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