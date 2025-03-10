import React from 'react';

const Section = ({ updateSection }) => {
    return (
        <div className="col">
            <div className="col-sm-12 form-floating">
                <select 
                    className="form-select mb-3 text" 
                    name="section" 
                    id="section_option" 
                    onChange={(e) => updateSection(e.target.value)}
                >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                </select>
                <label htmlFor="section_option" className="heading-text">Section</label>
            </div>
        </div>
    );
}

export default Section;
