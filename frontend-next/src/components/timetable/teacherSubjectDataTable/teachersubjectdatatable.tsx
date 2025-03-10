import React from 'react'

const teachersubjectdatatable = (props) => {
    console.log(props);
    return (
        <div className="container mt-3 scrollablecontainer">
            <table className="table" id="teacher_table">
                <thead>
                    <tr>
                        <th className="table-light text border-dark border-3 align-middle" scope="col">Subject Name </th>
                        <th className="table-light text border-dark border-3 align-middle" scope="col">Teacher Name</th>
                        <th className="table-light text border-dark border-3 align-middle" scope="col">Subject Code</th>
                        <th className="table-light text border-dark border-3 align-middle" scope="col">Number of Hours</th>
                        <th className="table-light text border-dark border-3 align-middle" scope="col">Theory / Practical</th>
                    </tr>
                </thead>
                <tbody>
                    {props.teacher_subject_data.map((data, index) => (
                        <tr key={index} className='align-middle'>
                            <td className="text border-dark border-3">{data.subjectname}</td>
                            <td className="text border-dark border-3">{data.teachername}</td>
                            <td className="text border-dark border-3">{data.subjectcode}</td>
                            <td className="text border-dark border-3">{data.weekly_hrs}</td>
                            <td className="text border-dark border-3">{data.theory_practical}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default teachersubjectdatatable
