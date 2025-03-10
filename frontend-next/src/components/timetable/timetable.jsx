import React from 'react'
import { useState, useEffect } from 'react';
import './timetablecss.css'
import Timetabletable from './timetableTable/timetabletable.jsx'
import Teachersubjectdatatable from './teacherSubjectDataTable/teachersubjectdatatable.jsx'

const Timetable_table = (props) => {

		return (
			<div className="container-fluid" id="ttdiv">
				<Timetabletable schedule={props.timetable.schedule}/>
				<Teachersubjectdatatable teacher_subject_data = {props.timetable.teacher_subject_data}/>
			</div>
		)
}
	export default Timetable_table;
