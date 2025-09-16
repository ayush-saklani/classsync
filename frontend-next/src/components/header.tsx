'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function Header() {
  const logout = () => {
    // Clear all cookies
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    // document.cookie.split(";").forEach((c) => {
    //   document.cookie = c
    //     .replace(/^ +/, "")
    //     .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    // });
    window.location.href = "/login";  // Redirect to login page
  };
  const pathname = usePathname();
  const showLogout = pathname.startsWith("/edit");

  // Check if not logged in (no cookies), then redirect to /login
  useEffect(() => {
    if (pathname.startsWith("/edit") && (!localStorage.getItem('accessToken'))) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <nav className="navbar navbar-expand mx-3">
      <img src="/image/logo.png" className="h-18 d-inline-block align-text-top " alt="Class-Sync Logo" />
      <h2 className="mx-3 my-3 heading-text">Class-Sync Timetable Manager</h2>
      {
        showLogout &&
        <button className="ms-auto fw-bold h4 px-4 btn btn-lg btn-danger rounded-pill float-end"
          onClick={logout}>Logout</button>
      }
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