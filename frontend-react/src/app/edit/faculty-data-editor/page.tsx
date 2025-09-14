import Header from "@/components/header";
import Footer from "@/components/footer";

export default function FacultyDataEditorPage() {
  return (
    <>
      <Header />
      <section className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Teacher List Modifing Portal</h1>
          <ul className="pt-3">
            <h4 className="center text text-danger fw-bold">Warning <i className="bi bi-exclamation-triangle-fill"></i> </h4>
            <li className="center text text-danger fw-bold">Use all CAPS for Teacher ID and don't use space in-between</li>
            <li className="center text text-danger fw-bold">DONT USE THIS IF THE TEACHERS ARE ALREADY DECIDED AS IT WILL RESET TEACHERS SCHEDULE DATA</li>
            <li className="center text text-danger fw-bold">Yellow color indicates that Teacher is active and has teaching slot alloted</li>
            <li className="center text text-danger fw-bold">Contact Developers for any query, help and support</li>
          </ul>
        </div>

        <div className="container mt-5">
          <table className="table" id="teacher_table">
            {/* ... table content ... */}
          </table>

          <div className="container row pt-2">
            <h1 className="text fw-bold">Add faculty </h1>
            <div className="col-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="add_faculty_id" placeholder="" />
                <label htmlFor="floatingInput">Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="add_faculty_name" placeholder="" />
                <label htmlFor="floatingInput">Teacher Name <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-2">
              <button type="button" className="button" id="add_faculty_button">
                <div className="button-top-blue h4"><b>ADD <i className="bi bi-plus-circle" style={{ WebkitTextStroke: '1px' }}></i> </b></div>
                <div className="button-bottom-blue"></div>
              </button>
            </div>
          </div>

          <div className="container row pt-2">
            <h1 className="text fw-bold">Remove faculty </h1>
            <div className="col-10">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="remove_faculty_id" placeholder="" />
                <label htmlFor="floatingInput">Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-2">
              <button type="button" className="button" id="remove_faculty_button">
                <div className="button-top-red h4"><b>Remove<i className="bi bi-exclamation-triangle-fill text-warning"></i> </b></div>
                <div className="button-bottom-red"></div>
              </button>
            </div>
          </div>

          <div className="container row pt-2">
            <h1 className="text fw-bold">Update faculty </h1>
            <div className="col-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="update_faculty_id" placeholder="" />
                <label htmlFor="update_faculty_id">Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="update_faculty_name" placeholder="" />
                <label htmlFor="update_faculty_name">New teacher Name <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-2">
              <button type="button" className="button" id="update_faculty_button">
                <div className="button-top-blue h4"><b>Update <i className="bi bi-bandaid" style={{ WebkitTextStroke: '0.5px' }}></i> </b></div>
                <div className="button-bottom-blue"></div>
              </button>
            </div>
          </div>

          <div className="container row pt-2 under-development">
            <h1 className="text fw-bold">Swap Schedule </h1>
            <div className="col-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="old_teacher_id" placeholder="" />
                <label htmlFor="old_teacher_id">Old Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="new_teacher_id" placeholder="" />
                <label htmlFor="new_teacher_id">New Teacher ID <b className="text-danger">*</b> </label>
              </div>
            </div>
            <div className="col-2">
              <button type="button" className="button" id="swap_schedule">
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
