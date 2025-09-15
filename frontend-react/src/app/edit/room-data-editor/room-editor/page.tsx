"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { room_schema } from '@/models/room.model';
import toast from 'react-hot-toast';
import { fetch_all_rooms, save_all_rooms } from '@/utils/fetchroom';
import { RiResetRightFill } from 'react-icons/ri';
import { room_type_options } from '@/utils/constant';

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

  return (
    <>
      <Header />
      <div className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Room Data Editing Portal</h1>
          <dl className="pt-3 mx-4">
            <h4 className="center text text-danger fw-bold">Warning <i className="bi bi-exclamation-triangle-fill"></i> </h4>
            <li className="center text text-danger fw-bold">
              Naming schema can be find <a href="/assets/doc/room-schema.pdf" target="_blank">here</a>
            </li>
            <li className="center text text-danger fw-bold">Yellow color indicates that room is being used</li>
            <li className="center text text-danger fw-bold">Contact Developers for any query, help and support</li>
          </dl>
          <div className="">
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
                    <th className="table-light text border-dark border-2 col-1" scope="col">Room ID</th>
                    <th className="table-light text border-dark border-2 col-5" scope="col">Room Name</th>
                    <th className="table-light text border-dark border-2 col-2" scope="col">Capacity</th>
                    <th className="table-light text border-dark border-2 col-2" scope="col">Room Type</th>
                    <th className="table-light text border-dark border-2 col-1" scope="col">Alloted ?</th>
                  </tr>
                </thead>
                <tbody>
                  {room_list.map((room: room_schema) => (
                    <tr key={room.roomid} className={room.roomid === "0" ? " " : ""}>
                      <td
                        className={`p-0 font-bold text border-dark border-2 col-1 align-middle text-center ${room.roomid === "0" ? " text-danger" : ""}`}
                        scope="row"
                      >
                        {room.roomid === "0" ? (
                          room.roomid
                        ) : (
                          <input
                            type="text"
                            className="form-control font-bold text-center"
                            value={room.roomid}
                            onChange={e => {
                              const newRoomId = e.target.value;
                              setroom_list(prev =>
                                prev.map(r =>
                                  r.roomid === room.roomid ? { ...r, roomid: newRoomId } : r
                                )
                              );
                            }}
                          />
                        )}
                      </td>
                      <td className={`p-0 font-bold text border-dark border-2 col-5 align-middle ${room.roomid === "0" ? " text-danger" : ""}`}>
                        {room.roomid === "0" ? (
                          room.name
                        ) : (
                          <input
                            type="text"
                            className="form-control font-bold"
                            value={room.name}
                            onChange={e => {
                              const newName = e.target.value;
                              setroom_list(prev =>
                                prev.map(r =>
                                  r.roomid === room.roomid ? { ...r, name: newName } : r
                                )
                              );
                            }}
                          />
                        )}
                      </td>
                      <select
                        className={`form-select font-bold text border-dark border-0 col-2 align-middle ${room.roomid === "0" ? " text-danger" : ""}`}
                        value={room.capacity}
                        onChange={e => {
                          const newCapacity = Number(e.target.value);
                          setroom_list(prev =>
                            prev.map(r =>
                              r.roomid === room.roomid ? { ...r, capacity: newCapacity } : r
                            )
                          );
                        }}
                        disabled={room.roomid === "0"}
                      >
                        {[1, 2, 3, 4].map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <td className={`p-0 text border-dark border-2 col-2 ${room.roomid === "0" ? " text-danger" : ""}`}>
                        <select
                          className="form-select text border-0 "
                          value={room.type}
                          onChange={e => {
                            const newType = e.target.value;
                            setroom_list(prev =>
                              prev.map(r =>
                                r.roomid === room.roomid ? { ...r, type: newType } : r
                              )
                            );
                          }}
                          disabled={room.roomid === "0"}
                        >
                          {room_type_options.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className={`p-0 font-bold text border-dark border-2 col-1 align-middle ${room.allowed_course?.length > 0 ? " bg-warning" : ""}`}>
                        {room.allowed_course.join(", ")}
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
        </div >
      )}
      <Footer />
    </>
  );
}
