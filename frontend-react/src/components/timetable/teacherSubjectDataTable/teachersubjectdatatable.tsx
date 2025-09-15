import React from 'react';
import { timetable_schema, Subject } from '@/models/timetable.model';

interface TeacherSubjectTableProps {
  teacherSubjectData: Subject[] | null;
}

const TeacherSubjectTable: React.FC<TeacherSubjectTableProps> = ({ teacherSubjectData }) => {
  return (
    <table className="table" id="teacher_table">
      <thead>
        <tr>
          <th className="table-light text border-dark border-3" scope="col">Subject Name </th>
          <th className="table-light text border-dark border-3" scope="col">Teacher Name</th>
          <th className="table-light text border-dark border-3" scope="col">Teacher ID</th>
          <th className="table-light text border-dark border-3" scope="col">Subject Code</th>
          <th className="table-light text border-dark border-3" scope="col">Weekly Teaching Hours</th>
          <th className="table-light text border-dark border-3" scope="col">Theory / Practical</th>
          <th className="table-light text border-dark border-3" scope="col">Current<br />Assigned<br />Hours</th>
          <th className="table-light text border-dark border-3" scope="col">Room Type</th>
        </tr>
      </thead>
      <tbody>
        {teacherSubjectData && teacherSubjectData.map((row, i) => (
          <tr key={i}>
            <td className="border-dark text border-3">{row.subjectname}</td>
            <td className="border-dark text border-3">{row.teachername}</td>
            <td className="border-dark text border-3">{(row.teacherid != "0" && row.teacherid != "") ? row.teacherid : ''}</td>
            <td className="border-dark text border-3 fw-bolder">{row.subjectcode}</td>
            <td className="border-dark text border-3 h5 fw-bold">{row.weekly_hrs}</td>
            <td className="border-dark text border-3">{row.theory_practical.charAt(0).toUpperCase() + row.theory_practical.slice(1)}</td>
            <td className="border-dark text border-3 h4 fw-bold">{ }</td>
            <td className="border-dark text border-3">{row.room_type.charAt(0).toUpperCase() + row.room_type.slice(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherSubjectTable;