import React from 'react';

const Semester = ({ updateSemester }) => {
    return (
        <div className="col">
            <div className="col-sm-12 form-floating">
                <select 
                    className="form-select mb-3 text" 
                    name="semester" 
                    id="semester_option" 
                    onChange={(e) => updateSemester(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                <label htmlFor="semester_option" className="heading-text">Semester</label>
            </div>
        </div>
    );
}

export default Semester;
