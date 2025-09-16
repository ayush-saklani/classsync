'use client';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { faculty_schema } from "@/models/faculty.model";
import { timetable_schema } from "@/models/timetable.model";
import { fetch_all_faculty, save_faculty_list } from "@/utils/fetchfaculty";
import { fetch_timetable } from "@/utils/fetchtimetable";
import toast from "react-hot-toast";
import { room_schema } from "@/models/room.model";
import { fetch_all_rooms, save_all_rooms } from "@/utils/fetchroom";
import { faculty_default_schedule, room_default_schedule } from "@/utils/constant";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export default function ResetPage() {
  const reset_room_data = async () => {
    localStorage.removeItem('room_list');
    let rooms = await fetch_all_rooms();
    rooms.forEach(async (room: room_schema) => {
      room.schedule = room_default_schedule as any;
    });
    await save_all_rooms(rooms);
  };
  const reset_faculty_data = async () => {
    localStorage.removeItem('facultyList');
    let faculty = await fetch_all_faculty();
    faculty.forEach(async (faculty: faculty_schema) => {
      faculty.schedule = faculty_default_schedule as any;
    });
    await save_faculty_list(faculty);
  }
  return (
    <>
      <Header />
      <section className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Reset Timetable Manager Database</h1>
          <dl className="pt-3 mx-5">
            <h4 className="center text text-danger fw-bold">Warning⚠️ </h4>
            <li className="center text text-danger fw-bold">This action will delete all the data of the timetable manager</li>
            <li className="center text text-danger fw-bold">This action is irreversible</li>
            <li className="center text text-danger fw-bold">Contact Developers for any query, help and support</li>
          </dl>
        </div>

        <div className="container mt-5">
          <div className="container row pt-3">
            <h1 className="col-lg-9 col-md-12 text fw-bold"> <i className="bi bi-person-x-fill" style={{ WebkitTextStroke: '2px' }}></i> Reset All Faculty Schedule Data</h1>
            <div className="col-lg-3 col-md-12">
              <button type="button" className="button" id="reset_faculty_data_button"
                onClick={() => {
                  if (confirm("Are you sure you want to reset all faculty schedule data? This action is irreversible.")) {
                    reset_faculty_data();
                  } else {
                    toast.error('Action cancelled');
                  }
                }}>
                <div className="button-top-red h4"><b>Reset⚠️ </b></div>
                <div className="button-bottom-red"></div>
              </button>
            </div>
          </div>
          <div className="container row pt-3">
            <h1 className="col-lg-9 col-md-12 text fw-bold"> <i className="bi bi-building-x" style={{ WebkitTextStroke: '0.8px' }}></i> Reset All Room Occupancy Data </h1>
            <div className="col-lg-3 col-md-12">
              <button type="button" className="button" id="reset_room_occupancy_data_button"
                onClick={() => {
                  if (confirm("Are you sure you want to reset all room occupancy data? This action is irreversible.")) {
                    reset_room_data();
                  } else {
                    toast.error('Action cancelled');
                  }
                }}>
                <div className="button-top-red h4"><b>Reset⚠️ </b></div>
                <div className="button-bottom-red"></div>
              </button>
            </div>
          </div>
          <div className="under-development">
            <span className="h4 text-danger fw-bold px-3">Under Development🚧 </span>
            <div className="container row pt-3">
              <h1 className="col-lg-9 col-md-12 text fw-bold"><i className="bi bi-file-earmark-x" style={{ WebkitTextStroke: '2px' }}></i> Delete All Section Timetable Data </h1>
              <div className="col-lg-3 col-md-12">
                <button type="button" className="button" id="remove_timetable_data_button">
                  <div className="button-top-red h4"><b>Delete⚠️ </b></div>
                  <div className="button-bottom-red"></div>
                </button>
              </div>
            </div>
            <div className="container row pt-3">
              <h1 className="col-lg-9 col-md-12 text fw-bold"> <i className="bi bi-arrow-up-circle" style={{ WebkitTextStroke: '2px' }}></i> Semester +1 </h1>
              <div className="col-lg-3 col-md-12">
                <button type="button" className="button" id="remove_timetable_data_button">
                  <div className="button-top-red h4"><b>Update <i className="bi bi-arrow-up-circle flash" style={{ WebkitTextStroke: '1px' }}></i> </b></div>
                  <div className="button-bottom-red"></div>
                </button>
              </div>
            </div>
            {/* <div className="container row pt-3">
              <h1 className="col-lg-9 col-md-12 text fw-bold"> <i className="bi bi-exclamation-triangle" style={{ WebkitTextStroke: '2px' }}></i> Delete All Room </h1>
              <div className="col-lg-3 col-md-12">
                <button type="button" className="button" id="remove_room_data_button">
                  <div className="button-top-red h4"><b>Delete⚠️ </b></div>
                  <div className="button-bottom-red"></div>
                </button>
              </div>
            </div> */}
          </div>
          <div className="container pt-5 ">
            <h1 className="fw-bold py-3">This is Mandatory to do all the steps in the below Sequences<i className="bi bi-asterisk align-top h6 text-danger" style={{ WebkitTextStroke: '1px' }}></i></h1>
            <h1 className="fw-bold">
              <i className="bi-person-x-fill" style={{ WebkitTextStroke: '2px' }}></i> <i className="bi bi-caret-right-fill"></i>
              <i className="bi bi-building-x" style={{ WebkitTextStroke: '0.8px' }}></i> <i className="bi bi-caret-right-fill"></i>
              <i className="bi bi-file-earmark-x" style={{ WebkitTextStroke: '2px' }}></i>
            </h1>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
