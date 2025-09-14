import React from 'react'
import './style.css'
const eventToggle = () => {
    return (
        <div className="col-1 text-center d-flex align-items-center justify-content-center">
            <div className="text-center">
                <label className="switch">
                    <input className="toggle" type="checkbox" id="toggle_event" />
                    <span className="slider round"></span>
                    <span className="card-side"></span>
                </label>
            </div>
        </div>
    )
}

export default eventToggle
