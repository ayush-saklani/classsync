import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar navbar-expand mx-3">
      <img src="/image/logo.png" className="h-18 d-inline-block align-text-top " alt="Class-Sync Logo" />
      <h2 className="mx-3 my-3 heading-text">Class-Sync Timetable Manager</h2>
      {/* <div className="menu float-end mt-2 mx-2" id="sidebar">
        <div className="item">
          <a className="link text fw-bold"><span className="text-dar">Direct Links <i className="bi bi-list" style={{ WebkitTextStrokeWidth: '1px' }}></i></span></a>
          <div className="submenu">
            <div className="submenu-item"><Link href="/edit/timetable-editor/" className="submenu-link text fw-bold"> Editor <i className="bi bi-pencil-fill"></i></Link></div>
            <div className="submenu-item"><Link href="/edit/subject-data-editor/" className="submenu-link text fw-bold"> Set Subject <i className="bi bi-book" style={{ WebkitTextStrokeWidth: '1px' }}></i> </Link></div>
            <div className="submenu-item"><Link href="/edit/faculty-data-editor/" className="submenu-link text fw-bold"> Edit Faculty <i className="bi bi-person-fill-add"></i> </Link></div>
            <div className="submenu-item"><Link href="/edit/faculty-data-set/" className="submenu-link text fw-bold"> Set Faculty  <i className="bi bi-person-fill"></i> </Link></div>
            <div className="submenu-item"><Link href="/edit/misc/" className="submenu-link text fw-bold"> Misc <i className="bi bi-xbox"></i> </Link></div>
            <div className="submenu-item"><Link href="/edit/reset/" className="submenu-link text fw-bold"> Reset <i className="bi bi-exclamation-triangle-fill"></i> </Link></div>
          </div>
        </div>
      </div> */}
    </nav>
  );
}