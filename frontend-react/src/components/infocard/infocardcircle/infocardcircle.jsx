import React from 'react'
import '../style.css'
const infocardcr = (props) => {
    return (
        <div className="col-sm-8 col-md-4 col-xl-4 mt-4">
            <div className="card text-bg-dark" style={{ borderRadius: '50%', overflow: 'hidden', textAlign: 'center' }}>
                <a href="/view/"><img src={props.img} className="card-img" alt="..." />
                    <div className="card-img-overlay">
                        <h2 className="card-title text"><b>{props.title}</b></h2>
                        <p className="card-text fw-bold pb-2">{props.description}</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default infocardcr
