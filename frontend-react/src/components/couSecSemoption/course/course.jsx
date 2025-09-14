import React from 'react';

const Course = ({ updateCourse }) => {
    return (
        <div className="col">
            <div className="col-sm-12 form-floating">
                <select 
                    className="form-select mb-3 text" 
                    name="course" 
                    id="course_option" 
                    onChange={(e) => updateCourse(e.target.value)}
                >
                    <option value="btechcse">B.Tech CSE</option>
                    <option value="mtech">M.Tech</option>
                    <option value="phd">PhD</option>
                </select>
                <label htmlFor="course_option" className="heading-text">Course</label>
            </div>
        </div>
    );
}

export default Course;
