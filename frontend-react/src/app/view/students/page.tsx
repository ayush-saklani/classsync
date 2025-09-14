"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { student_schema, Slot, Schedule, Day } from '@/models/student.model'; // Changed from room.model
import toast from 'react-hot-toast';
import DynamicOptions from '@/components/DynamicOptions';

const timeSlots = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"];
const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function StudentPage() {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');


  const [selectedStudentId, setSelectedStudentId] = useState<string>(''); // Changed state variable
  const [studentData, setStudentData] = useState<student_schema | null>(null); // Changed state variable
  const [student_list, setStudent_list] = useState<student_schema[]>([]); // Changed state variable

  const fetch_student_list = async () => {   // Fetch all students from the server // Changed function name
    const toastId = toast.loading('Fetching Student List...'); // Changed message
    console.log("Fetching Student List..."); // Changed message
    try {
      if (localStorage.getItem('student_list')) { // Changed localStorage key
        const cachedList = localStorage.getItem('student_list'); // Changed localStorage key
        if (cachedList) {
          setStudent_list(JSON.parse(cachedList));
          console.log(JSON.parse(cachedList));
          console.log("Using cached student list"); // Changed message
          toast.success('Student List Loaded from Cache', { id: toastId }); // Changed message
          return;
        }
      }
      const response = await fetch(`${SERVER_URL}/student/getall`, { // Changed API endpoint
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Student Data Found"); // Changed message
      setStudent_list(result.data || []);
      localStorage.setItem('student_list', JSON.stringify(result.data || [])); // Changed localStorage key
      toast.success('Student List Loaded', { id: toastId }); // Changed message
      return;
    } catch (error) {
      console.error(':::: Student Data not available (SERVER ERROR) :::: ', error); // Changed message
      toast.error('Failed to Load Student List', { id: toastId }); // Changed message
      return;
    }
  };

  const fetchfreshdata = async () => {
    localStorage.removeItem('student_list'); // Changed localStorage key
    toast.error('cache cleared. fetching fresh data');
    await fetch_student_list();
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetch_student_list();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      const student = student_list.find(st => st.studentid === selectedStudentId); // Changed find condition
      setStudentData(student ?? null);
    } else {
      setStudentData(null);
    }
  }, [selectedStudentId]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const student_Id = event.target.value; // Changed variable name
    setSelectedStudentId(student_Id);
  };
  const getSlotContent = (day: Day | undefined, timeSlot: keyof Day) => {
    const slot: Slot | undefined = day?.[timeSlot];
    if (slot?.subjectcode && slot?.subjectcode[0] !== '') {
      return (
        <div className="slot-content">
          <div>{slot.course} {slot.semester}</div>
          <div>[ {slot.section} ]</div>
          <div>{slot.subjectcode}</div>
          <div>Teacher: {slot.teacherid}</div>
        </div>
      );
    }
    return null;
  };
  const getSlotClassName = (day: Day | undefined, timeSlot: keyof Day) => {
    const slot: Slot | undefined = day?.[timeSlot];
    if (slot?.subjectcode && slot?.subjectcode[0] !== '') {
      return "text bg-practical bg-gradient heading-text border-dark border-3";
    } else if (slot?.subjectcode && slot.subjectcode[0] === '') {
      return "text bg-holiday fw-bold align-middle h5 py-3";
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

      {studentData && (
        <div className="container-fluid" id="ttdiv">
          <div className="container-fluid pt-3">
            <table className="table text-center align-middle mb-0 pb-0" id="student_detail"> {/* Changed id */}
              <thead>
              </thead>
              <tbody>
                <tr>
                  <th className="text table-light fw-bold py-3 h5 col-5" scope="col">{studentData.name} ({studentData.studentid})</th> {/* Changed display */}
                  <th className="text table-light fw-bold py-3 h5 col-2" scope="col">Course : {studentData.course}</th> {/* Changed display */}
                  <th className="text table-light fw-bold py-3 h5 col-2" scope="col">Semester : {studentData.semester}</th> {/* Changed display */}
                  <th className="text table-light fw-bold py-3 h5 col-2" scope="col">Section : {studentData.section}</th> {/* Changed display */}
                </tr>
              </tbody>
            </table>
          </div>
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
                  const daySchedule = studentData.schedule[lowerCaseDayName];
                  return (
                    <tr key={dayName}>
                      <th className="table-light border-dark border-3" scope="row">{dayName}</th>
                      {timeSlots.map((timeSlot) => (
                        <td key={timeSlot} className={getSlotClassName(daySchedule, timeSlot as keyof Day)}>
                          {getSlotContent(daySchedule, timeSlot as keyof Day)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}