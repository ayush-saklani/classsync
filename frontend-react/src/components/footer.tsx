import React from 'react';
import logo from '@/../public/image/logo.png'; // Ensure the path is correct

const Footer = () => {
    return (
        <footer className="bd-footer py-4 py-md-5">
            <div className="container pt-md-5 px-4 px-md-3 text-body-secondary">
                <a className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none" href="/">
                    <img src={logo.src} className="h-18 d-inline-block align-text-top" />
                    <h2 className="my-3 heading-text fs-5 mx-2 text">ClassName-Sync Timetable Manager</h2>
                </a>
                <ul className="list-unstyled small">
                    <li className="text mb-2 fw-semibold">Designed and built with all the love and passion in the world by <a className="link-danger fw-bold" href="https://github.com/ayush-saklani">ayush-saklani</a> <b className="text-dark">X</b> <a className="link-primary fw-bold" href="https://github.com/RawatDevanshu">RawatDevanshu</a>.</li>
                    <li className="text mb-2 fw-semibold">Currently v1.8.0.</li>
                </ul>
                <ul className="h4 list-unstyled d-flex">
                    <a target="_blank" href="https://www.linkedin.com/in/devanshurawat/" className="mx-1"><i className="bi bi-linkedin text text-primary"></i></a>
                    <a target="_blank" href="https://github.com/RawatDevanshu" className="mx-1"><i className="bi bi-github text text-primary"></i></a>
                    <p className="mx-2"> <b className="text-dark"> X </b> </p>
                    <a target="_blank" href="https://www.linkedin.com/in/ayush-saklani/" className="mx-1"><i className="bi bi-linkedin text text-danger"></i></a>
                    <a target="_blank" href="https://github.com/ayush-saklani" className="mx-1"><i className="bi bi-github text text-danger"></i></a>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
