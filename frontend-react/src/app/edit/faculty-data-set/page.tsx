import Header from "@/components/header";
import Footer from "@/components/footer";
import DynamicOptions from "@/components/DynamicOptions";

export default function FacultyDataSettPage() {
  return (
    <>
      <Header />
      <section className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Timetable Editing Portal - Set Faculty Data</h1>
          <div className="row mt-3">
            {/* <DynamicOptions /> */}
            <div className="col-1">
              <button type="button" className="button" id="reset_tt">
                <div className="button-top-blue h5 fw-bold"><b>RESET <i className="bi bi-exclamation-triangle-fill flash"></i></b></div>
                <div className="button-bottom-blue"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <table className="table" id="teacher_table">
            {/* ... table content ... */}
          </table>
        </div>

        <div className="container text-center">
          <button type="button" className="button" id="save_tt_json" disabled>
            <div className="button-top-red h5"><b>Save TT JSON on DB</b></div>
            <div className="button-bottom-red"></div>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}
