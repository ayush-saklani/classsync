import React from 'react'
import './style.css'

const bsbutton = (props) => {
    // <Threedbutton redbutton buttoncolor="var(--Dim-Red)" textcolor="var(--bg-light)" text="Logout" />

    return (
        <div>
            <button className="fw-bold h4 px-4 btn btn-lg rounded-pill m-2"
                style={{ backgroundColor: props.buttoncolor, color: props.textcolor, borderColor: props.buttoncolor }} >
                {props.text}
            </button>
        </div>
    )
}

export default bsbutton
