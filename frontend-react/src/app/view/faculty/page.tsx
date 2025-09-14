"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { faculty_schema, Slot, Schedule, Day } from '@/models/faculty.model';
import { room_schema } from '@/models/room.model';
import toast from 'react-hot-toast';
import { RiResetRightFill } from 'react-icons/ri';

const timeSlots = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"];
const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function FacultyPage() {
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('');
  const [facultyData, setFacultyData] = useState<faculty_schema | null>(null);
  const [facultyList, setFacultyList] = useState<faculty_schema[]>([]);
  const [room_list, setroom_list] = useState<room_schema[]>([]);

  const fetch_room_list = async () => {   // Fetch all rooms from the server
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
  const fetch_faculty_list = async () => {
    const toastId = toast.loading('Fetching Faculty List...');
    try {
      console.log("Fetching Faculty List...");
      if (localStorage.getItem('facultyList')) {
        const cachedList = localStorage.getItem('facultyList');
        if (cachedList) {
          setFacultyList(JSON.parse(cachedList));
          console.log(JSON.parse(cachedList));
          console.log("Using cached faculty list");
          toast.success('Faculty List Loaded from Cache', { id: toastId });
          return;
        }
      }
      const response = await fetch(`${SERVER_URL}/faculty/getall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const filteredFaculty = (result.data || []).filter((faculty: faculty_schema) => faculty.teacherid !== "0");
      console.log(filteredFaculty);
      localStorage.setItem('facultyList', JSON.stringify(filteredFaculty));
      toast.success('Faculty List Loaded', { id: toastId });
      setFacultyList(filteredFaculty);
    } catch (error) {
      console.error(':::: Faculty Data not available (SERVER ERROR) :::: ', error);
      toast.error('Failed to Load Faculty List', { id: toastId });
      return [];
    }
  };
  const fetchfreshdata = async () => {
    setSelectedFacultyId('');
    setFacultyList([]);
    localStorage.removeItem('facultyList');
    localStorage.removeItem('room_list');
    toast.error('cache cleared. fetching fresh data');
    await fetch_faculty_list();
    await fetch_room_list();
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetch_faculty_list();
      await fetch_room_list();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFacultyId) {
      const faculty = facultyList.find(fac => fac.teacherid === selectedFacultyId);
      setFacultyData(faculty || null);
    } else {
      setFacultyData(null);
    }
  }, [selectedFacultyId]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const facultyId = event.target.value;
    setSelectedFacultyId(facultyId);
  };
  const getSlotContent = (day: Day | undefined, timeSlot: keyof Day) => {
    const slot: Slot | undefined = day?.[timeSlot];
    if (slot?.course && slot?.subjectcode && slot?.roomid) {
      let message = "Room : N.A";
      for (let i = 0; i < room_list.length; i++) {
        if (room_list[i].roomid == slot.roomid.toString()) {
          message = `Room : ${room_list[i].name}`;
          break;
        }
      }
      return (
        <div className="slot-content">
          <div>{slot.subjectcode}</div>
          <div>{slot.course} {slot.semester}</div>
          <div>{message}</div>
          <div>Section: {slot.section.join(',')}</div>
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
          <h1 className="center text fw-bold">Timetable viewing Portal - Faculty</h1>
        </div>

        <div className="container">
          <div className="row mt-3">
            <div className="col-md-11">
              <div className="form-floating">
                <select
                  className="form-select mb-3 text"
                  name="faculty"
                  id="teacher_option"
                  value={selectedFacultyId}
                  onChange={handleChange}
                >
                  <option value="">Select Faculty</option>
                  {facultyList.map((faculty) => (
                    <option key={faculty.teacherid} value={faculty.teacherid}>
                      {faculty.name} ({faculty.teacherid})
                    </option>
                  ))}
                </select>
                <label htmlFor="teacher_option" className="heading-text text">Faculty Name</label>
              </div>
            </div>
            <div className="col-md-1 align-items-center justify-content-center mb-3">
              <button
                type="button"
                className="text d-flex align-items-center justify-content-center h-full w-full"
                title="Reset selection"
                onClick={() => fetchfreshdata()}
                style={{
                  borderRadius: '8px',
                  border: '1.5px solid #ccc',
                }}
              >
                <RiResetRightFill size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {facultyData && (
        <div className="container-fluid" id="ttdiv">
          <div className="container-fluid pt-3">
            <table className="table text-center align-middle mb-0 pb-0" id="teacher_detail">
              <thead>
              </thead>
              <tbody>
                <tr>
                  <th className="text table-light fw-bold py-3 h5 col-6" scope="col">Faculty Name : {facultyData.name}</th>
                  <th className="text table-light fw-bold py-3 h5 col-3" scope="col">Faculty ID : {facultyData.teacherid}</th>
                  <th className="text table-light fw-bold py-3 h5 col-3" scope="col">Total Teaching hrs : {Object.values(facultyData.schedule).reduce((acc, day) => {
                    return (
                      acc +
                      Object.values(day).filter(
                        (slot): slot is Slot =>
                          slot !== undefined && slot !== null && typeof slot === 'object' && 'course' in slot && typeof (slot as Slot).course === 'string' &&
                          (slot as Slot).course.trim() !== ''
                      ).length
                    );
                  }, 0)}</th>
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
                  const daySchedule = facultyData.schedule[lowerCaseDayName];
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
