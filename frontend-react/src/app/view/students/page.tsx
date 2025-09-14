'use client';

import React from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import DynamicOptions from "@/components/DynamicOptions";

export default function StudentsPage() {
  return (
    <>
      <Header />
      <div className="container-fluid mt-5">
        <div className="container">
          <h1 className="center text fw-bold">Timetable viewing Portal - Student</h1>
        </div>

        <div className="container">
          <div className="row mt-3">
            <div className="col-md-4">
              <DynamicOptions />
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
        <div className="container-fluid mt-3 scrollablecontainer">
          <table className="table text-center align-middle" id="mytable">
            {/* ... table content ... */}
          </table>
        </div>

        <div className="container-fluid mt-3 scrollablecontainer">
          <table className="table" id="teacher_table">
            {/* ... table content ... */}
          </table>
        </div>
      </div>

      <div className="container text-center pt-3">
        <button type="button" className="button" id="download">
          <div className="button-top-red h4"><b>Download PDF</b></div>
          <div className="button-bottom-red"></div>
        </button>
      </div>

      <Footer />
    </>
  );
}
