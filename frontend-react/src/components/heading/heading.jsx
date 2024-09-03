import React from 'react'
import WarningList from '../warninglist/warninglist';
const heading = (props) => {
    const shouldDisplayWarning = props.shouldDisplayWarning || false;
    return (
        <div className="container">
            <h1 className="center text fw-bold pt-4">{props.heading}</h1>
            {shouldDisplayWarning && <WarningList />}
        </div>
    )
}

export default heading;
