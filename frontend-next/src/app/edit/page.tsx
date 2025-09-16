
import Header from "@/components/header";
import Link from "next/link";

export default function EditPage() {
  return (
    <>
      <Header />
      <section className="container mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Admin Control Panel</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <a href="https://gehutimetable.vercel.app/">
                  <img src="/image/view.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Timetable Viewer <i className="bi bi-eye" style={{ WebkitTextStroke: '0.4px' }}></i></b></h2>
                    <p className="card-text fw-bold">This portal is used to view timetable of the sections, Faculties and Rooms.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="/edit/timetable-editor/">
                  <img src="/image/img25.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Timetable Editor <i className="bi bi-gear-wide" style={{ WebkitTextStroke: '0.5px' }}></i></b></h2>
                    <p className="card-text fw-bold">This portal is used to edit timetables. It is a read-write portal.</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="/edit/subject-data-editor/">
                  <img src="/image/edit-sub-data.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Generic Subject Data Setter <i className="bi bi-database-fill-gear" style={{ WebkitTextStroke: '0px' }}></i></b></h2>
                    <p className="card-text fw-bold">This page is used to enter subject schemes (subject data) for courses.</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="/edit/faculty-data-set/">
                  <img src="/image/img5.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Faculty Setter <i className="bi bi-person-check-fill" style={{ WebkitTextStroke: '0.5px' }}></i></b></h2>
                    <p className="card-text fw-bold">This portal is used to set the faculty data for all sections across sections.</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="/edit/faculty-data-editor/">
                  <img src="/image/edit-faculty-edit.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Faculty Data Editor <i className="bi bi-person-gear" style={{ WebkitTextStroke: '1px' }}></i> </b></h2>
                    <p className="card-text fw-bold">This page is used to add, remove and modify Faculty details.</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark new-feature">
                <Link href="/edit/room-data-editor/">
                  <img src="/image/img21.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Room Editor and Allotter <i className="bi bi-buildings" style={{ WebkitTextStroke: '0.1px' }}></i></b></h2>
                    <p className="card-text fw-bold">This portal is used for editing and allotmentment of room to courses.</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark new-feature">
                <Link href="/edit/reset/">
                  <img src="/image/edit-complete-reset.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Reset Database <i className="bi bi-exclamation-triangle-fill flash"></i></b></h2>
                    <p className="card-text fw-bold">This portal is used to reset data. <i><b>Warning: This action is irreversible.</b></i></p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark under-development">
                <Link href="/edit/">
                  <img src="/image/img10.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Extra Features <i className="bi bi-basket3-fill"></i></b></h2>
                    <p className="card-text fw-bold"> All the miscellaneous and other features are available here.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bd-footer py-4 py-md-5">
        <div className="position-fixed bottom-0 end-0 m-3" style={{ maxWidth: '25rem', zIndex: 1000 }} id="message_container"></div>
      </footer>
    </>
  );
}
