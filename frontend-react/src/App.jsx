import React, { useState, useEffect } from 'react';
import Timetable_table from './components/timetable/timetable.jsx';
import Header from './components/header/header.jsx';
import CouSecSemoption from './components/couSecSemoption/couSecSemoption.jsx';
import Heading from './components/heading/heading.jsx';
import Footer from './components/footer/footer.jsx';
import fetchTimetable from './utils/fetchtimetable.jsx';
import toast, { Toaster } from 'react-hot-toast';

const TimetableList = () => {
	const [course, setCourse] = useState('btechcse');
	const [semester, setSemester] = useState('5');
	const [section, setSection] = useState('A1');

	const [timetable, setTimetable] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		console.log('Fetching timetable data...');
		setLoading(true);
		fetchTimetable(section, course, semester)
			.then(response => {
				if (!response.ok) {
					throw new Error(':::: Room Data not available (SERVER ERROR) ::::');
				}
				return response.json();
			}).then(data => {
				toast.success("Timetable Data Fetched Successfully");
				setTimetable(data.data);
				setLoading(false);
			}).catch(error => {
				setTimetable(null);
				toast.error(error.message);
				setLoading(false);
			});
	}, [course, semester, section]);
	return (
		<div>
			<Header />
			<Toaster position="bottom-right" />
			<Heading heading="Timetable Viewing Portal - Students" />
			<CouSecSemoption displaycourse displaysemester displaysection displayeventToggle
				course={course}
				semester={semester}
				section={section}
				updateCourse={setCourse}
				updateSemester={setSemester}
				updateSection={setSection}
			/>
			{
				loading ?
					<h1 className='text fw-bold text-center my-5' style={{ color: "var(--Dim-Blue)" }}><i className="bi bi-hourglass-split" style={{ WebkitTextStrokeWidth: "1px" }}></i> Loading ....</h1> :
					timetable != null ?
						<Timetable_table timetable={timetable} />
						: <h1 className='text fw-bold text-center mt-5 text-danger'><i className="bi bi-ban" style={{ WebkitTextStrokeWidth: "3px" }}></i> Timetable Data Not Available</h1>
			}
			<Footer />
		</div>
	);
}

export default TimetableList; 1