import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RoomPage() {
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
                <select className="form-select mb-3 text" name="Room" id="room_options"></select>
                <label htmlFor="room_options" className="heading-text text">Room</label>
              </div>
            </div>
            <div className="col-md-1 text-center d-flex align-items-center justify-content-center">
              <div className="text-center">
                <label className="switch">
                  <input className="toggle" type="checkbox" id="toggle_event" />
                  <span className="slider round"></span>
                  <span className="card-side"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" id="ttdiv">
        <div className="container-fluid pt-3">
          <table className="table text-center align-middle mb-0 pb-0" id="teacher_detail">
            {/* ... table content ... */}
          </table>
        </div>
        <div className="container-fluid scrollablecontainer">
          <table className="table text-center align-middle" id="mytable">
            {/* ... table content ... */}
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}
