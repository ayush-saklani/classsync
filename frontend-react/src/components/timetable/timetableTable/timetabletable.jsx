import React from 'react';
import { timetable_schema, room_schema } from '@/models/timetable.model';

const TimetableTable = ({ timetable, roomList, onCellChange, onCopy, onReset }) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const timeSlots = ['08-09', '09-10', '10-11', '11-12', '12-01', '01-02', '02-03', '03-04', '04-05', '05-06'];

  return (
    // bus-arr bus-dep
    <table className="table text-center align-middle" id="mytable">
      <thead>
        <tr>
          <th className="bording text table-light" scope="col"><i className="bi bi-twitter-x"></i></th>
          {timeSlots.map(slot => (
            <th key={slot} className="bording text table-light" scope="col">{slot}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((day, i) => (
          <tr key={day}>
            <th className={`bording table-light text ${day === 'SUN' ? 'bg-warning' : ''}`} scope="row">{day}</th>
            {timeSlots.map((slot, j) => (
              <td key={slot} className="bording timetable-cell">
                <select
                  className="form-select form-select text subjectselectbox fw-bold"
                  style={{ whiteSpace: 'pre-wrap' }}
                  value={timetable?.schedule[day.toLowerCase()]?.[slot]?.subjectcode || ''}
                  onChange={e => onCellChange(day, slot, 'subject', e.target.value)}
                >
                  <option value=""></option>
                  {timetable?.teacher_subject_data.map(subject => (
                    <option key={subject.subjectcode} value={subject.subjectcode}>{subject.subjectcode}</option>
                  ))}
                </select>
                <select
                  className="form-select form-select text roomselectbox"
                  style={{ whiteSpace: 'pre-wrap' }}
                  value={timetable?.schedule[day.toLowerCase()]?.[slot]?.class_id || '0'}
                  onChange={e => onCellChange(day, slot, 'room', e.target.value)}
                >
                  <option value="0"></option>
                  {roomList && roomList.map(room => (
                    <option key={room.roomid} value={room.roomid}>{room.name}</option>
                  ))}
                </select>
                <div className="popover-content">
                  {j > 0 && (
                    <button
                      className="copy-left popover-button btn btn-primary rounded-start-pill p-1 me-0"
                      style={{ backgroundColor: 'var(--brand-cyan)' }}
                      onClick={() => onCopy(i, j, 'left')}
                    >
                      <i className="bi bi-arrow-bar-left" style={{ WebkitTextStrokeWidth: '1px' }}></i>
                      <i className="bi bi-clipboard-data-fill"></i>
                    </button>
                  )}
                  <button
                    className="copy-reset popover-button btn btn-dark rounded-0 p-1 ms-0 px-2"
                    style={{ backgroundColor: 'var(--Hard-Background)' }}
                    onClick={() => onReset(i, j)}
                  >
                    <i className="bi bi-arrow-clockwise" style={{ WebkitTextStrokeWidth: '1px' }}></i>
                  </button>
                  {j < timeSlots.length - 1 && (
                    <button
                      className="copy-right popover-button btn btn-danger rounded-end-pill p-1 ms-0"
                      style={{ backgroundColor: 'var(--brand-red)' }}
                      onClick={() => onCopy(i, j, 'right')}
                    >
                      <i className="bi bi-clipboard-data-fill"></i>
                      <i className="bi bi-arrow-bar-right" style={{ WebkitTextStrokeWidth: '1px' }}></i>
                    </button>
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table >
  );
};

export default TimetableTable;