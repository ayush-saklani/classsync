'use client';
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DynamicOptions from "@/components/DynamicOptions";
import { fetch_all_faculty } from "@/utils/fetchfaculty";
import toast from "react-hot-toast";
import { faculty_schema } from "@/models/faculty.model";
import { timetable_schema } from "@/models/timetable.model";
import { fetch_timetable, remove_teacher_from_section, save_timetable } from "@/utils/fetchtimetable";
import { fetch_generic_table_data } from "@/utils/fetchGenericTable";
import { timetable_default_schedule } from "@/utils/constant";

export default function FacultyDataSettPage() {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [facultyList, setFacultyList] = useState<faculty_schema[]>([]);
  const [timetableData, setTimetableData] = useState<timetable_schema>(); // Changed state variable

  const fetchData = async () => {
    let faculty = await fetch_all_faculty();
    faculty.sort((a: { teacherid: string; }, b: { teacherid: any; }) => a.teacherid.localeCompare(b.teacherid));
    setFacultyList(faculty);
    console.log(course, semester, section);
    let timetable = await fetch_timetable(course, semester, section);
    if (timetable) {
      setTimetableData(timetable);
    } else if (timetable == null) {
      toast.error('No Timetable Found, creating new one');
      let table = await fetch_generic_table_data(course, semester);
      timetable = { ...table, section: section, schedule: timetable_default_schedule };
      setTimetableData(timetable);
    }
  };

  const save_timetable_data = async () => {
    if (!timetableData) {
      toast.error('No Timetable Data to Save');
      return;
    }
    console.log(timetableData);
    console.log(course, semester, section);
    let res = await save_timetable(timetableData);
  }
  const remove_teacher = async (teacherid: string, subjectcode: string) => {
    if (!timetableData) {
      toast.error('No Timetable Data to Update');
      return;
    }
    let res = await remove_teacher_from_section(teacherid, course, semester, section, subjectcode);
    if (res) {
      // Update local state to reflect the removal
      const updatedData = timetableData.teacher_subject_data.map(entry => {
        if (entry.subjectcode === subjectcode && entry.teacherid === teacherid) {
          return { ...entry, teacherid: '' }; // Reset teacherid
        }
        return entry;
      });
      setTimetableData({ ...timetableData, teacher_subject_data: updatedData });
      localStorage.setItem('timetableData', JSON.stringify({ ...timetableData, teacher_subject_data: updatedData }));
    }
  }

  return (
    <>
      <Header />
      <title>Class-Sync | Set Faculty</title>
      <section className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Timetable Editing Portal - Set Faculty Data</h1>
          <div className="row mt-3">
            <div className="col-10">
              <DynamicOptions course={course} setCourse={setCourse} semester={semester} setSemester={setSemester} section={section} setSection={setSection} />
            </div>
            <div className="col-2 mt-3">
              <button type="button" className="button" onClick={async () => { await fetchData(); }}>
                <div className="button-top-blue h5 fw-bold"><b>Get Table</b></div>
                <div className="button-bottom-blue"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <table className="table" id="teacher_table">
            <thead>
              <tr style={{ verticalAlign: "top" }}>
                <th className="col-3 table-light text border-dark border-3" scope="col">Subject Name </th>
                <th className="col-4 table-light text border-dark border-3" scope="col">Teacher Name</th>
                <th className="col-1 table-light text border-dark border-3" scope="col">Subject Code</th>
                <th className="col-1 table-light text border-dark border-3" scope="col">Weekly Teaching Hours</th>
                <th className="col-1 table-light text border-dark border-3" scope="col">Theory / Practical</th>
                <th className="col-1 table-light text border-dark border-3" scope="col">Room Type</th>
                <th className="col-1 table-light text border-dark border-3 text-center" scope="col">Change Teacher</th>
              </tr>
            </thead>
            <tbody>
              {timetableData && timetableData.teacher_subject_data.map((entry, index) => (
                <tr key={index} style={{ verticalAlign: "top" }}>
                  <td className="table-light text border-dark border-3">{entry.subjectname}</td>
                  <td className="p-0 table-light text border-dark border-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={entry.teacherid}
                      disabled={entry.teacherid !== '' && entry.teacherid !== '0'}
                      onChange={(e) => {
                        const updatedData = [...(timetableData.teacher_subject_data || [])];
                        updatedData[index].teacherid = e.target.value;
                        setTimetableData({ ...timetableData, teacher_subject_data: updatedData });
                      }}
                    >
                      <option value="" selected={entry.teacherid === "" || entry.teacherid === "0"}> </option>
                      {facultyList.map((faculty) => (
                        <option key={faculty.teacherid} value={faculty.teacherid} selected={faculty.teacherid === entry.teacherid}>
                          {faculty.name} ({faculty.teacherid})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="table-light font-bold text border-dark border-3">{entry.subjectcode}</td>
                  <td className="table-light text border-dark border-3">{entry.weekly_hrs}</td>
                  <td className="table-light text border-dark border-3">{entry.theory_practical}</td>
                  <td className="table-light text border-dark border-3">{entry.room_type}</td>
                  <td className="table-light text border-dark border-3">
                    <button type="button" className="btn btn-danger" onClick={() => {
                      remove_teacher(entry.teacherid, entry.subjectcode);
                    }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="container text-center">
          <button type="button" className="button" id="save_tt_json"
            onClick={async () => {
              await save_timetable_data();
            }}>
            <div className="button-top-red h5"><b>Save Timetable</b></div>
            <div className="button-bottom-red"></div>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}
