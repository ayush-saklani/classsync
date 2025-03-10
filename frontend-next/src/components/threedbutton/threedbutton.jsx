import React from 'react'
import './style.css'
const threedbutton = (props) => {
    return (
        <div>
            {props.redbutton &&
                <button type="button" className="button">
                    <div className="button-top-red h4"><b>Download PDF</b></div>
                    <div className="button-bottom-red"></div>
                </button>
            }
            {props.bluebutton &&
                <button type="button" className="button">
                    <div className="button-top-blue h4"><b>Download PDF</b></div>
                    <div className="button-bottom-blue"></div>
                </button>
            }
        </div>
    )
}

export default threedbutton
