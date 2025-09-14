"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { room_schema, Slot, Schedule, Day } from '@/models/room.model';
import toast from 'react-hot-toast';
import { RiResetRightFill } from 'react-icons/ri';
import { fetch_all_rooms } from '@/utils/fetchroom';

const timeSlots = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"];
const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function RoomPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [roomData, setRoomData] = useState<room_schema | null>(null);
  const [room_list, setroom_list] = useState<room_schema[]>([]);

  const fetchfreshdata = async () => {
    localStorage.removeItem('room_list');
    toast.error('cache cleared. fetching fresh data');
    let rooms = await fetch_all_rooms();
    setroom_list(rooms);
  };
  useEffect(() => {
    const fetchData = async () => {
      let rooms = await fetch_all_rooms();
      setroom_list(rooms);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      const room = room_list.find(rm => rm.roomid === selectedRoomId);
      setRoomData(room ?? null);
    } else {
      setRoomData(null);
    }
  }, [selectedRoomId]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const room_Id = event.target.value;
    setSelectedRoomId(room_Id);
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
          <h1 className="center text fw-bold">Timetable viewing Portal - Rooms</h1>
        </div>

        <div className="container">
          <div className="row mt-3">
            <div className="col-md-11">
              <div className="form-floating">
                <select
                  className="form-select mb-3 text"
                  name="room_option"
                  id="room_option"
                  value={selectedRoomId}
                  onChange={handleChange}
                >
                  <option value="">Select Room</option>
                  {room_list.map((room) => (
                    <option key={room.roomid} value={room.roomid}>
                      {room.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="room_option" className="heading-text text">Room</label>
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

      {roomData && (
        <div className="container-fluid" id="ttdiv">
          <div className="container-fluid pt-3">
            <table className="table text-center align-middle mb-0 pb-0" id="teacher_detail">
              <thead>
              </thead>
              <tbody>
                <tr>
                  <th className="text table-light fw-bold py-3 h5 col-5" scope="col">{roomData.name}</th>
                  <th className="text table-light fw-bold py-3 h5 col-2" scope="col">Capacity : {roomData.capacity}</th>
                  <th className="text table-light fw-bold py-3 h5 col-2" scope="col">Type : {roomData.type}</th>
                  <th className="text table-light fw-bold py-3 h5 col-2" scope="col">Used : {(Object.values(roomData.schedule).reduce((acc, day) => {
                    return (
                      acc +
                      Object.values(day).filter(
                        (slot): slot is Slot =>
                          slot !== undefined && slot !== null && typeof slot === 'object' && 'course' in slot && typeof (slot as Slot).course === 'string' &&
                          (slot as Slot).course.trim() !== ''
                      ).length
                    );
                  }, 0) / 0.60).toFixed(2)} {"%"}</th>
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
                  const daySchedule = roomData.schedule[lowerCaseDayName];
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
