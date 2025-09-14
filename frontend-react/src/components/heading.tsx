import React from 'react'
import WarningList from './warninglist';
const heading = (props: any) => {
    const shouldDisplayWarning = props.shouldDisplayWarning || false;
    return (
        <div className="container">
            <h1 className="center text fw-bold pt-4">{props.heading}</h1>
            {shouldDisplayWarning && <WarningList />}
        </div>
    )
}

export default heading;
