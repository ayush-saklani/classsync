import React from 'react'
import '../style.css'
const infocardsq = (props) => {
    // example usage: creates a rounded card with an image and a title and description
    // <div className="container">
    //     <div className='row container'>
    //         <Infocardcr title={<>Timetable Editor <i className="bi bi-gear-wide"></i></>} description="Create and edit your timetable" img={photo} />
    //         <Infocardsq title={<>Timetable Editor <i className="bi bi-gear-wide"></i></>} description="Create and edit your timetable" img={photo} />
    //     </div>
    // </div>
    return (
        <div className="col-md-6 col-xl-4 mt-4">
            <div className="card text-bg-dark">
                <a href="/edit/timetable-editor/"><img src={props.img} className="card-img" alt="..." />
                    <div className="card-img-overlay">
                        <h2 className="card-title text"><b>{props.title}</b></h2>
                        <p className="card-text fw-bold">{props.description}</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default infocardsq
