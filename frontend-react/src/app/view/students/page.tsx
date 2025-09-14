"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { student_schema } from '@/models/student.model'; // Changed from room.model
import { Schedule, Day } from '@/models/timetable.model';
import toast from 'react-hot-toast';
import { timetable_schema, Slot } from '@/models/timetable.model';
import { room_schema } from '@/models/room.model';
import DynamicOptions from '@/components/DynamicOptions';

const timeSlots = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"];
const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function StudentPage() {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');

  const [timetableData, setTimetableData] = useState<timetable_schema | null>(null); // Changed state variable
  const [room_list, setroom_list] = useState<room_schema[]>([]);

  const fetch_room_list = async () => {
    const toastId = toast.loading('Fetching Room List...');
    console.log("Fetching Room List...");
    try {
      if (localStorage.getItem('room_list')) {
        const cachedList = localStorage.getItem('room_list');
        if (cachedList) {
          setroom_list(JSON.parse(cachedList));
          console.log(JSON.parse(cachedList));
          console.log("Using cached room list");
          toast.success('Room List Loaded from Cache', { id: toastId });
          return;
        }
      }
      const response = await fetch(`${SERVER_URL}/room/getall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Room Data Found");
      setroom_list(result.data || []);
      localStorage.setItem('room_list', JSON.stringify(result.data || []));
      toast.success('Room List Loaded', { id: toastId });
      return;
    } catch (error) {
      console.error(':::: Room Data not available (SERVER ERROR) :::: ', error);
      toast.error('Failed to Load Room List', { id: toastId });
      return;
    }
  };
  const fetch_timetable = async () => {
    const toastId = toast.loading('Fetching Timetable...');
    console.log("Fetching Timetable...");
    try {
      if (course == '' || semester == '' || section == '') {
        console.warn('Course, Semester, or Section not selected');
        toast.dismiss(toastId);
        return;
      }
      if (localStorage.getItem('timetableData')) {
        const cachedTimetable = localStorage.getItem('timetableData');
        if (cachedTimetable && localStorage.getItem('course') === course && localStorage.getItem('semester') === semester && localStorage.getItem('section') === section) {
          setTimetableData(JSON.parse(cachedTimetable));
          console.log("Using cached timetable data");
          toast.success('Timetable Loaded from Cache', { id: toastId });
          toast.dismiss(toastId);
          return;
        }
      }
      const response = await fetch(`${SERVER_URL}/table/get-timetable?` + new URLSearchParams({ course: course, semester: semester, section: section }), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      // Assuming result.data contains the timetable information
      localStorage.setItem('timetableData', JSON.stringify(result.data || null));
      localStorage.setItem('course', course);
      localStorage.setItem('semester', semester);
      localStorage.setItem('section', section);
      console.log("Timetable Data Found");
      toast.success('Timetable Loaded', { id: toastId });
      setTimetableData(result.data || null);
      return;
    } catch (error) {
      console.error('Error fetching timetable:', error);
      toast.error('Failed to Load Timetable', { id: toastId });
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch_room_list();
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await fetch_timetable();
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
      {0 && (
        <div className="container-fluid" id="ttdiv">
          <div className="container-fluid mt-3 scrollablecontainer">
            <table className="table text-center align-middle" id="mytable">
              <thead>
                <tr>
                  <th className="text table-light border-dark border-3" scope="col"><i className="bi bi-twitter-x"></i></th>
                  <th className="text table-light border-dark border-3" scope="col">08-09</th>
                  <th className="text table-light border-dark border-3" scope="col">09-10</th>
                  <th className="text table-light border-dark border-3" scope="col">10-11</th>
                  <th className="text table-light border-dark border-3" scope="col">11-12</th>
                  <th className="text table-light border-dark border-3" scope="col">12-01</th>
                  <th className="text table-light border-dark border-3" scope="col">01-02</th>
                  <th className="text table-light border-dark border-3" scope="col">02-03</th>
                  <th className="text table-light border-dark border-3" scope="col">03-04</th>
                  <th className="text table-light border-dark border-3" scope="col">04-05</th>
                  <th className="text table-light border-dark border-3" scope="col">05-06</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="table-light border-dark border-3" scope="row">MON</th>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                </tr>
                <tr>
                  <th className="table-light border-dark border-3" scope="row">TUE</th>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                  <td className="text bg-practical border-dark border-3"></td>
                </tr>
                <tr>
                  <th className="table-light border-dark border-3" scope="row">WED</th>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                </tr>
                <tr>
                  <th className="table-light border-dark border-3" scope="row">THU</th>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                  <td className="text bg-holiday border-dark border-3"></td>
                </tr>
                <tr>
                  <th className="table-light border-dark border-3" scope="row">FRI</th>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                </tr>
                <tr>
                  <th className="table-light border-dark border-3" scope="row">SAT</th>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                  <td className="text bg-theory border-dark border-3"></td>
                </tr>
                <tr>
                  <th className="table-light border-dark border-3" scope="row">SUN</th>
                  <td className="text bg-empty border-dark border-3"></td>
                  <td className="text bg-empty border-dark border-3"></td>
                  <td className="text bg-empty border-dark border-3"></td>
                  <td className="text bg-empty border-dark border-3"></td>
                  <td className="text bg-empty border-dark border-3"></td>
                  <td className="text bg-empty border-dark border-3"></td>
                  <td className="text bg-empty border-dark border-3"></td>
                  <td className="text bg-empty border-dark border-3"></td>
                  <td className="text bg-empty border-dark border-3"></td>
                  <td className="text bg-empty border-dark border-3"></td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>
      )}

      {1 && (
        <div className="container-fluid" id="ttdiv">
          <div className="container-fluid scrollablecontainer">
            <table className="table text-center align-middle" id="mytable">
              <thead>
                <tr>
                  <th className="text table-light border-dark border-3" scope="col"><i className="bi bi-twitter-x h5" style={{ WebkitTextStroke: '1px' }}></i></th>
                  {timeSlots.map((slot) => (
                    <th key={slot} className="text table-light border-dark border-3" scope="col">{slot}</th>
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