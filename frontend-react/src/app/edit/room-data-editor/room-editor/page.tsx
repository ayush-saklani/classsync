"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { room_schema } from '@/models/room.model';
import toast from 'react-hot-toast';
import { fetch_all_rooms, save_all_rooms } from '@/utils/fetchroom';
import DynamicOptions from '@/components/DynamicOptions';
import { RiResetRightFill } from 'react-icons/ri';

export default function RoomPage() {
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

  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');//they are needed no matter what
  const [section, setSection] = useState('');//they are needed no matter what
  useEffect(() => {
    const fetchData = async () => {
      let rooms = await fetch_all_rooms();
      rooms.sort((a: { roomid: any; }, b: { roomid: any; }) => a.roomid.localeCompare(b.roomid));
      setroom_list(rooms);
    }
    fetchData();
  }, [course]);
  return (
    <>
      <Header />
      <div className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Room Allotment Portal</h1>
          <dl className="pt-3 mx-4">
            <h4 className="center text text-danger fw-bold">Warning <i className="bi bi-exclamation-triangle-fill"></i> </h4>
            <li className="center text text-danger fw-bold">
              Naming schema can be find <a href="/assets/doc/room-schema.pdf" target="_blank">here</a>
            </li>
            <li className="center text text-danger fw-bold">Contact Developers for any query, help and support</li>
          </dl>
          <div className="">
            <div className='col-11'>
              <DynamicOptions course={course} setCourse={setCourse} semester={semester} setSemester={setSemester} section={section} setSection={setSection} onlyone={1} />
            </div>
            <div className="align-items-center justify-content-center mx-3">
              <button
                type="button"
                className="text d-flex align-items-center justify-content-center p-2 gap-2"
                title="Reset selection"
                onClick={() => fetchfreshdata()}
                style={{
                  borderRadius: '8px',
                  border: '1.5px solid #ccc',
                }}
              > <span className='font-bold'>Fetch Fresh Data</span>
                <RiResetRightFill size={30} />
              </button>
            </div>
          </div>
        </div>
      </div >

      {room_list && (
        <div className="container-fluid" id="ttdiv">
          <div className="container-fluid pt-3">
            <div className="container mt-3">
              <table className="table" id="room_table">
                <thead>
                  <tr>
                    <th className="table-light text border-dark border-2 col-2" scope="col">Room ID</th>
                    <th className="table-light text border-dark border-2 col-5" scope="col">Room Name</th>
                    <th className="table-light text border-dark border-2 col-2" scope="col">Capacity</th>
                    <th className="table-light text border-dark border-2 col-2" scope="col">Room Type</th>
                    <th className="table-light text border-dark border-2 col-1" scope="col">Alloted ?</th>
                  </tr>
                </thead>
                <tbody>
                  {room_list.map((room: room_schema) => (
                    <tr key={room.roomid} className={room.roomid === "0" ? " " : "bg-red-600"}>
                      <td className={`font-bold text border-dark border-2 col-2 align-middle ${room.roomid === "0" ? " text-danger" : ""}`} scope="row">{room.roomid}</td>
                      <td className={`font-bold text border-dark border-2 col-5 align-middle ${room.roomid === "0" ? " text-danger" : ""}`}>{room.name}</td>
                      <td className={`font-bold text border-dark border-2 col-2 align-middle ${room.roomid === "0" ? " text-danger" : ""}`}>{room.capacity}</td>
                      <td className={`font-bold text border-dark border-2 col-2 align-middle ${room.roomid === "0" ? " text-danger" : ""}`}>{room.type}</td>
                      <td className={`p-0 font-bold text border-dark border-2 col-1 align-middle ${room.allowed_course?.includes(course) ? " bg-warning" : ""}`}>
                        <div className="form-check form-switch d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                          <input
                            className={` form-check-input ${room.allowed_course?.includes(course) ? " border-warning" : ""}`}
                            type="checkbox"
                            role="switch"
                            id={`flexSwitchCheckDefault_${room.roomid}`}
                            checked={room.allowed_course?.includes(course)}
                            onChange={() => {
                              setroom_list(prev =>
                                prev.map(r =>
                                  r.roomid === room.roomid
                                    ? {
                                      ...r,
                                      allowed_course: r.allowed_course?.includes(course)
                                        ? r.allowed_course.filter(c => c !== course)
                                        : [...(r.allowed_course || []), course]
                                    }
                                    : r
                                )
                              );
                            }}
                            style={{
                              width: "3rem",
                              height: "1.5rem",
                              cursor: "pointer",
                            }}
                          />
                          <label className="form-check-label ms-2" htmlFor={`flexSwitchCheckDefault_${room.roomid}`}></label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="container text-center">
                <button type="button" className="button"
                  onClick={
                    async () => {
                      await save_all_rooms(room_list);
                    }
                  }>
                  <div className="button-top-blue h4"><b>Save Room Data</b></div>
                  <div className="button-bottom-blue"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
