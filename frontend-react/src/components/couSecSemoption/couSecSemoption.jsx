import React, { useEffect } from 'react';
import Course from './course/course.jsx';
import Semester from './semester/semester.jsx';
import Section from './section/section.jsx';
import EventToggle from './eventToggle/eventToggle.jsx';
import Options from '../../dynamicOption.jsx';

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
    Options.courses.forEach((element) => {
        if (element.course_id == course) {
            console.log(element.sections);
        }
    });
    return (
        <div className="container">
            <div className="row mt-4">
                {displaycourse && <Course updateCourse={updateCourse} />}
                {displaysemester && <Semester updateSemester={updateSemester} />}
                {displaysection && <Section updateSection={updateSection} />}
                {displayeventToggle && <EventToggle />}
            </div>
        </div>
    );
}

export default CouSecSemoption;
