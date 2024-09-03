import React from 'react'
import Tr from './tr/tr'
const timetabletable = (props) => {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const timeSlots = ['08-09', '09-10', '10-11', '11-12', '12-01', '01-02', '02-03', '03-04', '04-05', '05-06'];
    return (
        <div className="container-fluid mt-3 scrollablecontainer">
            <table className="table text-center align-middle" id="mytable">
                <thead>
                    <tr>
                        <th className="text bg-light border-dark border-3" scope="col"><i className="bi bi-twitter-x"></i></th>
                        <th className="text bg-light border-dark border-3" scope="col">08-09</th>
                        <th className="text bg-light border-dark border-3" scope="col">09-10</th>
                        <th className="text bg-light border-dark border-3" scope="col">10-11</th>
                        <th className="text bg-light border-dark border-3" scope="col">11-12</th>
                        <th className="text bg-light border-dark border-3" scope="col">12-01</th>
                        <th className="text bg-light border-dark border-3" scope="col">01-02</th>
                        <th className="text bg-light border-dark border-3" scope="col">02-03</th>
                        <th className="text bg-light border-dark border-3" scope="col">03-04</th>
                        <th className="text bg-light border-dark border-3" scope="col">04-05</th>
                        <th className="text bg-light border-dark border-3" scope="col">05-06</th>
                    </tr>
                </thead>
                <tbody>
                    {days.map(dayslot => (
                        <Tr key={dayslot} day={dayslot.toUpperCase()} daydata = {props.schedule[dayslot]}  />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default timetabletable
