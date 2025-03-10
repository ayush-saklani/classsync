import React from 'react'

const tr = (props) => {
    const timeSlots = ['08-09', '09-10', '10-11', '11-12', '12-01', '01-02', '02-03', '03-04', '04-05', '05-06'];

    return (
        <tr>
            <th className="text border-dark border-3" style={{ backgroundColor: "var(--bg-light)" }}>{props.day}</th>
            {
                timeSlots.map(slot => {
                    const classData = props.daydata[slot];
                    return (
                        <td className="text border-dark border-3 fw-bold" key={slot} style={{
                            backgroundColor: classData.subjectcode.startsWith('P') ? 'var(--Dim-Blue)' : classData.subjectcode ? "var(--Aqua)" : "var(--Foreground)",
                            color: classData.subjectcode.startsWith('P') ? 'white' : classData.subjectcode ? "black" : "var(--Foreground)"
                        }}>
                            {classData.subjectcode ? (
                                <>
                                    {classData.subjectcode}<br />{classData.class_id}
                                </>
                            ) : ''}
                        </td>
                    );
                })
            }
        </tr>
    );
}

export default tr
