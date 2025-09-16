'use client';
import Header from "@/components/header";
import Footer from "@/components/footer";
import DynamicOptions from "@/components/DynamicOptions";
import { useEffect, useState } from "react";
import { Subject, subjectTable_schema } from "@/models/subjecttable.model";
import { fetch_generic_table_data, save_generic_table_data, set_generic_data_for_all } from "@/utils/fetchGenericTable";
import { generic_data_default, room_type_options, subject_type_options } from "@/utils/constant";
import toast from "react-hot-toast";

export default function SubjectDataEditorPage() {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');

  const [genericData, setGenericData] = useState<subjectTable_schema>();
  useEffect(() => {
    const fetchData = async () => {
      if (course && semester) {
        setGenericData(generic_data_default);
        const data = await fetch_generic_table_data(course, semester);
        setGenericData(data);
        console.log("Fetched Generic Data:", data);
        // You can now use this data to populate your table or perform other actions
      }
    };
    fetchData();
  }, [course, semester]);

  const [newSubject, setNewSubject] = useState<Subject>({
    subjectcode: '',
    teacherid: '',
    weekly_hrs: '',
    teachername: '',
    subjectname: '',
    theory_practical: 'THEORY',
    room_type: 'class',
  });
  const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
    setGenericData(prev => {
      if (!prev) return prev;
      const subjects = [...(prev.teacher_subject_data || [])];
      subjects[index] = { ...subjects[index], [field]: value } as Subject;
      return { ...prev, teacher_subject_data: subjects };
    });
  };
  const save_new_subject = async () => {
    if (!newSubject.subjectcode || !newSubject.subjectname || !newSubject.weekly_hrs) {
      toast.error("Please fill all required fields");
      return;
    }

    if (isNaN(Number(newSubject.weekly_hrs))) {
      toast.error("Weekly Hours must be a number");
      return;
    }
    if (genericData?.teacher_subject_data?.some(subj => subj.subjectcode === newSubject.subjectcode)) {
      toast.error("Subject code already exists");
      return;
    }

    setGenericData(prev => {
      const base = prev ?? { ...generic_data_default };
      const updatedSubjects = [...(base.teacher_subject_data || []), newSubject];
      return { ...base, teacher_subject_data: updatedSubjects };
    });

    setNewSubject({
      subjectcode: '',
      teacherid: '',
      weekly_hrs: '',
      teachername: '',
      subjectname: '',
      theory_practical: 'THEORY',
      room_type: 'class',
    });
    toast.success("Subject Added Successfully");
  };

  const [removeSubjectCode, setRemoveSubjectCode] = useState('');
  const remove_subject = async () => {
    if (!removeSubjectCode) {
      toast.error("Please enter subject code to remove");
      return;
    }
    if (!genericData?.teacher_subject_data?.some(subj => subj.subjectcode === removeSubjectCode)) {
      toast.error("Subject code not found");
      return;
    }

    setGenericData(prev => {
      if (!prev) return prev;
      const updatedSubjects = prev.teacher_subject_data.filter(subj => subj.subjectcode !== removeSubjectCode);
      return { ...prev, teacher_subject_data: updatedSubjects };
    });

    setRemoveSubjectCode('');
    toast.success("Subject Removed Successfully");
  };
  const save_generic_data = async () => {
    if (!course || !semester) {
      toast.error("Please select course and semester");
      return;
    }
    if (!genericData) {
      toast.error("No data to save");
      return;
    }
    // const success = await fetch_generic_table_data(course, semester);
    const success = await save_generic_table_data(genericData);
    if (success) {
      toast.success("Generic Data Saved Successfully");
    } else {
      toast.error("Failed to Save Generic Data");
    }
  };
  const set_for_all_helper = async () => {
    if (confirm("This will set the generic data for all sections of this course and semester. This will overwrite existing data. Are you sure?")) {
      const success = await set_generic_data_for_all(course, semester);
      if (success) {
        toast.success("Generic Data Saved Successfully");
      } else {
        toast.error("Failed to Save Generic Data");
      }
    }
  };

  return (
    <>
      <Header />
      <title>Class-Sync | Generic Data Portal</title>
      <section className="container-fluid mt-5">
        <div className="container ">
          <h1 className="center text fw-bold">Timetable Editing Portal ( Sending Generic Data )</h1>
          <h2 className="center text text-danger fw-bold pt-3">Warnings and Conditions <i className="bi bi-exclamation-triangle-fill flash"></i> </h2>
          <dl className="mx-5">
            <li className="center text text-danger fw-bold">Use all CAPS</li>
            <li className="center text text-danger fw-bold">Don't use space in Subject Code</li>
            <li className="center text text-danger fw-bold">Two different teacher can't teach same subject to same section so we have to divide the subject</li>
            <li className="center text text-danger">e.g <b>XCS601</b> (career skills) <i className="bi bi-arrow-right" style={{ WebkitTextStroke: '2px' }}></i> <b>XCS601Q</b> (career skills Quant) && <b>XCS601V</b> (career skills Verbal)</li>
            <li className="center text text-danger fw-bold">Fill the data carefully and recheck it before resetting, as this do not have validation and may break the code </li>
            <li className="center text text-danger fw-bold">DONT USE THIS IF THE TEACHERS ARE ALREADY DECIDED AS IT WILL RESET TEACHER DATA</li>
          </dl>
        </div>

        <div className="container">
          <div className="row mt-3">
            <DynamicOptions course={course} setCourse={setCourse} semester={semester} setSemester={setSemester} section={section} setSection={setSection} onlyone={2} />
          </div>
        </div>

        <div className="container mt-3">
          <table className="table" id="teacher_table">
            <thead>
              <tr>
                <th className="table-light col-5 text border-dark border-2 align-middle" scope="col">Subject Name </th>
                <th className="table-light col-2 text border-dark border-2 align-middle" scope="col">Subject Code</th>
                <th className="table-light col-1 text border-dark border-2 align-middle" scope="col">Weekly Hours</th>
                <th className="table-light col-2 text border-dark border-2 align-middle" scope="col">Theory / Practical</th>
                <th className="table-light col-2 text border-dark border-2 align-middle" scope="col">Room Type</th>
              </tr>
            </thead>
            <tbody>
              {genericData?.teacher_subject_data
                ?.slice() // copy before sorting
                .sort((a, b) => {
                  if (a.theory_practical === "THEORY" && b.theory_practical === "PRACTICAL") return -1;
                  if (a.theory_practical === "PRACTICAL" && b.theory_practical === "THEORY") return 1;
                  return 0;
                })
                .map((subject, index) => (
                  <tr key={subject.subjectcode || index}>
                    <td className="p-0 font-bold text border-dark border-2 align-middle text-center">
                      <input
                        type="text"
                        className="form-control"
                        value={subject.subjectname}
                        onChange={e => handleSubjectChange(index, 'subjectname', e.target.value)}
                      />
                    </td>

                    <td className="p-0 font-bold text border-dark border-2 align-middle text-center">
                      <input
                        type="text"
                        className="form-control"
                        value={subject.subjectcode}
                        onChange={e => handleSubjectChange(index, 'subjectcode', e.target.value)}
                      />
                    </td>

                    <td className="p-0 font-bold text border-dark border-2 align-middle text-center">
                      <input
                        type="text"
                        className="form-control"
                        value={subject.weekly_hrs}
                        onChange={e => handleSubjectChange(index, 'weekly_hrs', e.target.value)}
                      />
                    </td>

                    <td className="p-0 font-bold text border-dark border-2 align-middle text-center">
                      <select
                        className="form-select"
                        value={subject.theory_practical}
                        onChange={e => handleSubjectChange(index, 'theory_practical', e.target.value)}
                      >
                        {subject_type_options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="p-0 text border-dark border-2 align-middle text-center">
                      <select
                        className="form-select text border-0"
                        value={subject.room_type?.toString() || ''}
                        onChange={e => handleSubjectChange(index, 'room_type', e.target.value)}
                      >
                        {room_type_options.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>

          <div className="container text-center">
            <button type="button" className="button" id="save_subject_list"
              onClick={() => { save_generic_data(); }}
            >
              <div className="button-top-blue h4"><b>Save Subject List ( Save Progress )</b></div>
              <div className="button-bottom-blue"></div>
            </button>
          </div>
          <div className="container mt-2">
            <div className="container row pt-2">
              <h1 className="text fw-bold">Add Subject</h1>
              <div className="col-9">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="add_room_name"
                    placeholder=""
                    value={newSubject.subjectname}
                    onChange={e => setNewSubject({ ...newSubject, subjectname: e.target.value })}
                  />
                  <label htmlFor="add_room_name">Subject Name <b className="text-danger">*</b></label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="add_subject_id"
                    placeholder=""
                    value={newSubject.subjectcode}
                    onChange={e => setNewSubject({ ...newSubject, subjectcode: e.target.value })}
                  />
                  <label htmlFor="add_subject_id">Subject Code <b className="text-danger">*</b></label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="add_room_name"
                    placeholder=""
                    value={newSubject.weekly_hrs}
                    onChange={e => setNewSubject({ ...newSubject, weekly_hrs: e.target.value })}
                  />
                  <label htmlFor="add_room_capacity">Weekly Hours <b className="text-danger">*</b></label>
                </div>
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="add_room_type"
                    value={newSubject.theory_practical}
                    onChange={e => setNewSubject({ ...newSubject, theory_practical: e.target.value })}
                  >
                    {subject_type_options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <label htmlFor="add_room_type">Theory / Practical <b className="text-danger">*</b></label>
                </div>
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="add_room_type"
                    value={newSubject.room_type.toString()}
                    onChange={e => setNewSubject({ ...newSubject, room_type: e.target.value })}
                  >
                    {room_type_options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <label htmlFor="add_room_type">Room Type <b className="text-danger">*</b></label>
                </div>
              </div>
              <div className="col-3 d-flex align-items-end">
                <button
                  type="button"
                  className="button w-100"
                  onClick={() => { save_new_subject(); }}
                >
                  <div className="button-top-blue h4"><b>Add Subject</b></div>
                  <div className="button-bottom-blue"></div>
                </button>
              </div>
            </div>
            <div className="container row pt-2">
              <h1 className="text fw-bold">Remove Subject</h1>
              <div className="col-8">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="add_subject_id"
                    placeholder=""
                    value={removeSubjectCode}
                    onChange={e => setRemoveSubjectCode(e.target.value)}
                  />
                  <label htmlFor="add_subject_id">Subject Code <b className="text-danger">*</b></label>
                </div>
              </div>
              <div className="col-4 d-flex align-items-end">
                <button
                  type="button"
                  className="button w-100"
                  onClick={() => { remove_subject(); }}
                >
                  <div className="button-top-blue h4"><b>Remove Subject</b></div>
                  <div className="button-bottom-blue"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section >
      <Footer />

      <div className="container text-center pb-3">
        <button type="button" className="button" id="set_for_all" onClick={() => { set_for_all_helper(); }}>
          <div className="button-top-blue h4"><b>SET ( SET FOR ALL ) <i className="bi bi-exclamation-triangle-fill text-warnin flash"></i> </b></div>
          <div className="button-bottom-blue"></div>
        </button>
      </div>
    </>
  );
}
