import React, { useEffect } from 'react';
import EventToggle from './eventToggle/eventToggle.jsx';
import Options from '../../utils/dynamicOption.jsx';

const CouSecSemoption = ({
    displaycourse,
    displaysemester,
    displaysection,
    displayeventToggle,
    updateCourse,
    updateSemester,
    updateSection,
    course,
    semester,
    section
}) => {
    return (
        <div className="container">
            <div className="row mt-4">
                {
                    displaycourse &&
                    <div className="col">
                        <div className="col-sm-12 form-floating">
                            <select
                                className="form-select mb-3 text"
                                name="course"
                                id="course_option"
                                onChange={(e) => updateCourse(e.target.value)}
                            >
                                {
                                    Options.courses.map((course) => {
                                        return (
                                            <option key={course.course_id} value={course.course_id}>{course.course_name}</option>
                                        );
                                    })
                                }
                            </select>
                            <label htmlFor="course_option" className="heading-text">Course</label>
                        </div>
                    </div>
                }
                {
                    displaysemester &&
                    <div className="col">
                        <div className="col-sm-12 form-floating">
                            <select
                                className="form-select mb-3 text"
                                name="semester"
                                id="semester_option"
                                onChange={(e) => updateSemester(e.target.value)}
                            >
                                {
                                    Options.courses.map((c) => {
                                        if (c.course_id == course) {
                                            return (
                                                Object.keys(c.sections).map((heresemester) => {
                                                    return (
                                                        <option key={heresemester} value={heresemester} selected={heresemester == semester}>{heresemester}</option>
                                                    );
                                                })
                                            );
                                        }
                                    })
                                }
                            </select>
                            <label htmlFor="semester_option" className="heading-text">Semester</label>
                        </div>
                    </div>}
                {
                    displaysection &&
                    <div className="col">
                        <div className="col-sm-12 form-floating">
                            <select
                                className="form-select mb-3 text"
                                name="section"
                                id="section_option"
                                onChange={(e) => updateSection(e.target.value)}
                            >
                                {
                                    Options.courses.map((c) => {
                                        if (c.course_id == course) {
                                            return (
                                                Object.keys(c.sections).map((sem) => {
                                                    if (sem == semester) {
                                                        return (
                                                            c.sections[sem].map((heresection) => {
                                                                return (
                                                                    <option key={heresection} value={heresection} selected={heresection == section}>{heresection}</option>
                                                                );
                                                            })
                                                        );
                                                    }
                                                })
                                            );
                                        }
                                    })
                                }
                            </select>
                            <label htmlFor="section_option" className="heading-text">Section</label>
                        </div>
                    </div>
                }
                {
                    displayeventToggle && <EventToggle />}
            </div>
        </div>
    );
}

export default CouSecSemoption;
