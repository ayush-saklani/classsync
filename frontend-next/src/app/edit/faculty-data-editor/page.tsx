'use client';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { faculty_schema } from "@/models/faculty.model";
import { useEffect, useState } from "react";
import { add_faculty, fetch_all_faculty, remove_faculty, update_one_faculty } from "@/utils/fetchfaculty";
import toast from "react-hot-toast";
import { faculty_default_schedule } from "@/utils/constant";
import { RiResetRightFill } from "react-icons/ri";

export default function FacultyDataEditorPage() {
  const [facultyList, setFacultyList] = useState<faculty_schema[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      let faculty = await fetch_all_faculty();
      faculty.sort((a: { teacherid: string; }, b: { teacherid: any; }) => a.teacherid.localeCompare(b.teacherid));
      setFacultyList(faculty);
    };
    fetchData();
  }, []);
  const fetchfreshdata = async () => {
    localStorage.removeItem('facultyList');
    setFacultyList([]);
    toast.error('cache cleared. fetching fresh data');
    let faculty = await fetch_all_faculty();
    setFacultyList(faculty);
  };

  const [addFacultyId, setAddFacultyId] = useState('');
  const [addFacultyName, setAddFacultyName] = useState('');
  const add_faculty_helper = async (id: string, name: string) => {
    if (id.trim() === "" || name.trim() === "") {
      toast.error("Please fill all the fields before saving the data (ID and Name are required)");
      return;
    }
    if (id === "0") {
      toast.error("ID 0 is reserved for Admin. Please use a different ID.");
      return;
    }
    if (facultyList.some(faculty => faculty.teacherid === id)) {
      toast.error("A faculty with this ID already exists. Please use a unique ID.");
      return;
    }

    let response = await add_faculty(id, name);
    if (response) {
      let newFacultyList = [...facultyList, { teacherid: id, name: name, schedule: faculty_default_schedule }];
      newFacultyList.sort((a, b) => a.teacherid.localeCompare(b.teacherid));
      localStorage.setItem('facultyList', JSON.stringify(newFacultyList));
      setFacultyList(newFacultyList);
      setAddFacultyId('');
      setAddFacultyName('');
      toast.success('Faculty Added Successfully');
    } else {
      toast.error('Failed to Add Faculty');
    }
  }

  const [removeFacultyId, setRemoveFacultyId] = useState('');
  const remove_faculty_helper = async (id: string) => {
    if (id.trim() === "") {
      toast.error("Please enter a valid Faculty ID");
      return;
    }
    let response = await remove_faculty(id);
    if (response) {
      let newFacultyList = facultyList.filter(faculty => faculty.teacherid !== id);
      localStorage.setItem('facultyList', JSON.stringify(newFacultyList));
      setFacultyList(newFacultyList);
      setRemoveFacultyId('');
      toast.success('Faculty Removed Successfully');
    } else {
      toast.error('Failed to Remove Faculty');
    }
  }

  const [updateFacultyId, setUpdateFacultyId] = useState('');
  const [updateFacultyName, setUpdateFacultyName] = useState('');
  const update_faculty_helper = async (id: string, name: string) => {
    if (id.trim() === "" || name.trim() === "") {
      toast.error("Please fill all the fields before updating the data (ID and Name are required)");
      return;
    }
    if (!facultyList.some(faculty => faculty.teacherid === id)) {
      toast.error("No faculty found with this ID.");
      return;
    }
    const response = await update_one_faculty({ teacherid: id, name: name, schedule: facultyList.find(faculty => faculty.teacherid === id)?.schedule || faculty_default_schedule });
    if (response) {
      let newFacultyList = facultyList.map(faculty => faculty.teacherid === id ? { ...faculty, name: name } : faculty);
      localStorage.setItem('facultyList', JSON.stringify(newFacultyList));
      setFacultyList(newFacultyList);
      setUpdateFacultyId('');
      setUpdateFacultyName('');
      toast.success('Faculty Updated Successfully');
    } else {
      toast.error('Failed to Update Faculty');
    }
  }

  const [swapOldFacultyId, setSwapOldFacultyId] = useState('');
  const [swapNewFacultyId, setSwapNewFacultyId] = useState('');
  const swap_schedule_helper = async (oldId: string, newId: string) => {
    // To be implemented
  }
  return (
    <>
      <Header />
      <title>Class-Sync | Teacher Modifing Portal</title>
      <section className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold ">Teacher List Modifing Portal</h1>
          <dl className="pt-3 mx-4">
            <h4 className="center text text-danger fw-bold">Warning <i className="bi bi-exclamation-triangle-fill"></i> </h4>
            <li className="center text text-danger fw-bold">Use all CAPS for Teacher ID and don't use space in-between</li>
            <li className="center text text-danger fw-bold">DONT USE THIS IF THE TEACHERS ARE ALREADY DECIDED AS IT WILL RESET TEACHERS SCHEDULE DATA</li>
            <li className="center text text-danger fw-bold">Yellow color indicates that Teacher is active and has teaching slot alloted</li>
            <li className="center text text-danger fw-bold">Contact Developers for any query, help and support</li>
          </dl>
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

        <div className="container mt-5">
          <div className="container mt-5">
            <table className="table" id="teacher_table">
              <thead>
                <tr>
                  <th className="table-light text border-dark border-2" scope="col">Teacher ID</th>
                  <th className="table-light text border-dark border-2" scope="col">Teacher Name</th>
                </tr>
              </thead>
              <tbody>
                <tr key={0} className="">
                  <td className="table-light text text-danger border-dark border-2 font-bold">0</td>
                  <td className="table-light text text-danger border-dark border-2 font-bold">Reserved by Admin</td>
                </tr>
                {facultyList.map((faculty) => (
                  <tr key={faculty.teacherid} className={faculty.teacherid ? "table-warning" : ""}>
                    <td className="table-light text border-dark border-2 font-bold">{faculty.teacherid}</td>
                    <td className="table-light text border-dark border-2">{faculty.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container row pt-2">
            <h1 className="text fw-bold">Add faculty </h1>
            <div className="col-4">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="add_faculty_id" placeholder=""
                  value={addFacultyId} onChange={e => setAddFacultyId(e.target.value)}
                />
                <label htmlFor="floatingInput">Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="add_faculty_name" placeholder=""
                  value={addFacultyName} onChange={e => setAddFacultyName(e.target.value)} />
                <label htmlFor="floatingInput">Teacher Name <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-3">
              <button type="button" className="button" id="add_faculty_button" onClick={() => { add_faculty_helper(addFacultyId, addFacultyName); }}>
                <div className="button-top-blue h4"><b>ADD <i className="bi bi-plus-circle" style={{ WebkitTextStroke: '1px' }}></i> </b></div>
                <div className="button-bottom-blue"></div>
              </button>
            </div>
          </div>

          <div className="container row pt-2">
            <h1 className="text fw-bold">Remove faculty </h1>
            <div className="col-9">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="remove_faculty_id" placeholder=""
                  value={removeFacultyId} onChange={e => setRemoveFacultyId(e.target.value)} />
                <label htmlFor="floatingInput">Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-3">
              <button type="button" className="button" id="remove_faculty_button" onClick={() => { remove_faculty_helper(removeFacultyId); }}>
                <div className="button-top-red h4"><b>Remove<i className="bi bi-exclamation-triangle-fill text-warning"></i> </b></div>
                <div className="button-bottom-red"></div>
              </button>
            </div>
          </div>

          <div className="container row pt-2">
            <h1 className="text fw-bold">Update faculty </h1>
            <div className="col-4">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="update_faculty_id" placeholder=""
                  value={updateFacultyId} onChange={e => setUpdateFacultyId(e.target.value)} />
                <label htmlFor="update_faculty_id">Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="update_faculty_name" placeholder=""
                  value={updateFacultyName} onChange={e => setUpdateFacultyName(e.target.value)} />
                <label htmlFor="update_faculty_name">New teacher Name <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-3">
              <button type="button" className="button" id="update_faculty_button"
                onClick={() => { update_faculty_helper(updateFacultyId, updateFacultyName); }}>
                <div className="button-top-blue h4"><b>Update <i className="bi bi-bandaid" style={{ WebkitTextStroke: '0.5px' }}></i> </b></div>
                <div className="button-bottom-blue"></div>
              </button>
            </div>
          </div>

          <div className="container row pt-2 under-development">
            <h1 className="text fw-bold">Swap Schedule </h1>
            <div className="col-4">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="old_teacher_id" placeholder=""
                  value={swapOldFacultyId} onChange={e => setSwapOldFacultyId(e.target.value)} />
                <label htmlFor="old_teacher_id">Old Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="new_teacher_id" placeholder=""
                  value={swapNewFacultyId} onChange={e => setSwapNewFacultyId(e.target.value)} />
                <label htmlFor="new_teacher_id">New Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-3">
              <button type="button" className="button" id="swap_schedule"
                onClick={() => { swap_schedule_helper(swapOldFacultyId, swapNewFacultyId); }}>
                <div className="button-top-blue h4"><b>Swap <i className="bi bi-arrow-repeat" style={{ WebkitTextStroke: '0.8px' }}></i> </b></div>
                <div className="button-bottom-blue"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
