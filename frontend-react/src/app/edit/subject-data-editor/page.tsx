import Header from "@/components/header";
import Footer from "@/components/footer";
import DynamicOptions from "@/components/DynamicOptions";

export default function SubjectDataEditorPage() {
  return (
    <>
      <Header />
      <section className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Timetable Editing Portal ( Sending Generic Data )</h1>
          <h2 className="center text text-danger fw-bold pt-3">Warnings and Conditions <i className="bi bi-exclamation-triangle-fill flash"></i> </h2>
          <ul>
            <li className="center text text-danger fw-bold">Use all CAPS</li>
            <li className="center text text-danger fw-bold">Don't use space in Subject Code</li>
            <li className="center text text-danger fw-bold">Two different teacher can't teach same subject to same section so we have to divide the subject</li>
            <li className="center text text-danger">e.g <b>XCS601</b> (career skills) <i className="bi bi-arrow-right" style={{ WebkitTextStroke: '2px' }}></i> <b>XCS601Q</b> (career skills Quant) && <b>XCS601V</b> (career skills Verbal)</li>
            <li className="center text text-danger fw-bold">Fill the data carefully and recheck it before resetting, as this do not have validation and may break the code </li>
            <li className="center text text-danger fw-bold">DONT USE THIS IF THE TEACHERS ARE ALREADY DECIDED AS IT WILL RESET TEACHER DATA</li>
          </ul>
        </div>

        <div className="container">
          <div className="row mt-3">
            <DynamicOptions />
          </div>
        </div>

        <div className="container mt-3">
          <table className="table" id="teacher_table">
            {/* ... table content ... */}
          </table>

          <div className="container text-center">
            <button type="button" className="btn my-2 p-0" id="add_row"><i className="h2 bi bi-plus-circle m-0"></i></button>
            <button type="button" className="btn my-2 p-0" id="delete_row"><i className="h2 bi bi-dash-circle m-0"></i></button>
          </div>

          <div className="container text-center">
            <button disabled type="button" className="button" id="save_subject_list">
              <div className="button-top-blue h4"><b>Save Subject List</b></div>
              <div className="button-bottom-blue"></div>
            </button>
          </div>
        </div>
      </section>
      <Footer />

      <div className="container text-center pb-3">
        <button disabled type="button" className="button" id="set_for_all">
          <div className="button-top-blue h4"><b>SET ( SET FOR ALL ) <i className="bi bi-exclamation-triangle-fill text-warnin flash"></i> </b></div>
          <div className="button-bottom-blue"></div>
        </button>
      </div>
    </>
  );
}
