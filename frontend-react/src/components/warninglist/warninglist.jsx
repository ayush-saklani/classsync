import React from 'react'

const warningList = () => {
    return (
        <div>
            <h2 className="center text text-danger fw-bold pt-3">Warnings and Conditions <i className="bi bi-exclamation-triangle-fill flash"></i> </h2>
            <ul>
                <li className="center text text-danger fw-bold">Use all CAPS</li>
                <li className="center text text-danger fw-bold">Don't use space in Subject Code</li>
                <li className="center text text-danger fw-bold">Two different teacher can't teach same subject to same section so we have to divide the subject</li>
                <li type="none" className="center text text-danger">e.g <b>XCS601</b> (career skills) <i className="bi bi-arrow-right"></i> <b>XCS601Q</b> (career skills Quant) && <b>XCS601V</b> (career skills Verbal)</li>
                <li className="center text text-danger fw-bold">Fill the data carefully and recheck it before resetting, as this do not have validation and may break the code </li>
                <li className="center text text-danger fw-bold">DONT USE THIS IF THE TEACHERS ARE ALREADY DECIDED AS IT WILL RESET TEACHER DATA</li>
            </ul>
        </div>
    )
}

export default warningList
