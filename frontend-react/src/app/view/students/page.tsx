"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Schedule, Day } from '@/models/timetable.model';
import { timetable_schema, Slot } from '@/models/timetable.model';
import { room_schema } from '@/models/room.model';
import DynamicOptions from '@/components/DynamicOptions';
import { fetch_all_rooms } from '@/utils/fetchroom';
import { fetch_timetable } from '@/utils/fetchtimetable';
import { options } from '@/utils/options';

const timeSlots = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"];
const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function StudentPage() {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');

  const [timetableData, setTimetableData] = useState<timetable_schema | null>(null); // Changed state variable
  const [room_list, setroom_list] = useState<room_schema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let rooms = await fetch_all_rooms();
      setroom_list(rooms);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let timetable = await fetch_timetable(course, semester, section);
      setTimetableData(timetable || null);
    };
    fetchData();
  }, [course, semester, section]);

  const getSlotContent = (day: Day | undefined, timeSlot: keyof Day, lowerCaseDayName: string) => {
    const slot: Slot | undefined = day?.[timeSlot];
    if (slot?.subjectcode && slot?.subjectcode[0] !== '') {
      let sections = room_list.find(room => room.roomid == slot.class_id)
        ?.schedule?.[lowerCaseDayName as keyof Schedule]?.[timeSlot]?.section?.slice()?.sort() || [];

      return (
        <div className="slot-content ">
          <div>{slot.subjectcode}</div>
          <div>{room_list.find(room => room.roomid == slot.class_id)?.name}</div>
          {sections.length > 1 && <div>({sections.join(", ")})</div>}
        </div>
      );
    }
    return null;
  };
  const getSlotClassName = (day: Day | undefined, timeSlot: keyof Day) => {
    const slot: Slot | undefined = day?.[timeSlot];
    if (slot?.subjectcode && slot?.subjectcode[0] !== '') {
      console.log(slot);
      if (slot.subjectcode[0].toLowerCase() === 'p') {
        return "text bg-practical bg-gradient heading-text border-dark border-3";
      } else {
        return "text bg-theory bg-gradient heading-text border-dark border-3";
      }
    } else {
      if (slot?.subjectcode && slot.subjectcode[0] === '') {
        return "text bg-holiday fw-bold align-middle h5 py-3";
      }
    }
    return "text bg-empty border-dark border-3"; // Placeholder for empty slot
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Timetable viewing Portal - Students</h1> {/* Changed title */}
        </div>
        <DynamicOptions
          course={course}
          semester={semester}
          section={section}
          setCourse={setCourse}
          setSemester={setSemester}
          setSection={setSection} />
      </div>

      {1 && (
        <div className="container-fluid" id="ttdiv">
          <div className="container-fluid scrollablecontainer">
            <table className="table text-center align-middle" id="mytable">
              <thead>
                <tr>
                  <th className="text table-light border-dark border-3" scope="col"><i className="bi bi-twitter-x h5" style={{ WebkitTextStroke: '1px' }}></i></th>
                  {timeSlots.map((slot) => (
                    <th key={slot} className={`text table-light border-dark border-3 ${options["arr"].includes(slot.split('-')[0]) ? 'bus-arr' : ''}
                    ${options["dep"].includes(slot.split('-')[1]) ? 'bus-dep' : ''}`} scope="col">{slot}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {daysOfWeek.map((dayName) => {
                  const lowerCaseDayName = dayName.toLowerCase() as keyof Schedule;
                  const daySchedule = timetableData?.schedule ? timetableData.schedule[lowerCaseDayName] : undefined;
                  return (
                    <tr key={dayName}>
                      <th className="table-light border-dark border-3" scope="row">{dayName}</th>
                      {timeSlots.map((timeSlot) => (
                        <td
                          key={timeSlot}
                          className={`${getSlotClassName(daySchedule, timeSlot as keyof Day)} align-middle`}
                          style={{ verticalAlign: 'middle' }}
                        >
                          {getSlotContent(daySchedule, timeSlot as keyof Day, lowerCaseDayName)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="container-fluid mt-3 scrollablecontainer">
            <table className="table" id="teacher_table">
              <thead>
                <tr>
                  <th className="table-light text border-dark border-3" scope="col">Subject Name </th>
                  <th className="table-light text border-dark border-3" scope="col">Teacher Name</th>
                  <th className="table-light text border-dark border-3" scope="col">Subject Code</th>
                  <th className="table-light text border-dark border-3" scope="col">Number of Hours</th>
                  <th className="table-light text border-dark border-3" scope="col">Theory / Practical</th>
                </tr>
              </thead>
              <tbody>
                {timetableData?.teacher_subject_data && Object.entries(timetableData.teacher_subject_data).map(([subjectCode, subject]) => (
                  <tr key={subjectCode}>
                    <td className="text border-dark border-3">{subject.subjectname}</td>
                    <td className="text border-dark border-3">{subject.teachername}</td>
                    <td className="text border-dark border-3">{subject.subjectcode}</td>
                    <td className="text border-dark border-3">{subject.weekly_hrs}</td>
                    <td className="text border-dark border-3">{subject.theory_practical.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}