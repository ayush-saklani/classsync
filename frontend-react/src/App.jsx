import React, { useState, useEffect } from 'react';
import Timetable_table from './components/timetable/timetable';
import Header from './components/header/header';
import CouSecSemoption from './components/couSecSemoption/couSecSemoption.jsx';
import Heading from './components/heading/heading.jsx';
import Footer from './components/footer/footer';
import './assets/css/App.css';
import fetchTimetable from './fetchtimetable.jsx';

const TimetableList = () => {
	const [course, setCourse] = useState('btechcse');
	const [semester, setSemester] = useState('1');
	const [section, setSection] = useState('A1');

	const updateCourse = (newCourse) => setCourse(newCourse);
	const updateSemester = (newSemester) => setSemester(newSemester);
	const updateSection = (newSection) => setSection(newSection);

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
				console.log(data.data);
				setTimetable(data.data);
				setLoading(false);
			}).catch(error => {
				setTimetable(null);
				setError(error.message);
				setLoading(false);
			});
	}, [course, semester, section]);

	if (loading) return (
		<div>
			<Header />
			<Heading heading="Timetable Viewing Portal - Students" />
			<CouSecSemoption displaycourse displaysemester displaysection displayeventToggle
				course={course}
				semester={semester}
				section={section}
				updateCourse={updateCourse}
				updateSemester={updateSemester}
				updateSection={updateSection}
			/>
			<h1 className='text fw-bold text-center my-5' style={{ color: "var(--Dim-Blue)" }}><i className="bi bi-hourglass-split" style={{ WebkitTextStrokeWidth: "1px" }}></i> Loading ....</h1>
			<Footer />
		</div>
	);
	if (!timetable) return (
		<div>
			<Header />
			<Heading heading="Timetable Viewing Portal - Students" />
			<CouSecSemoption displaycourse displaysemester displaysection displayeventToggle
				course={course}
				semester={semester}
				section={section}
				updateCourse={updateCourse}
				updateSemester={updateSemester}
				updateSection={updateSection}
			/>
			<h1 className='text fw-bold text-center mt-5 text-danger'><i className="bi bi-ban" style={{ WebkitTextStrokeWidth: "3px" }}></i> Timetable Data Not Available</h1>
			<Footer />
		</div>
	);
	return (
		<div>
			<Header />
			<Heading heading="Timetable Viewing Portal - Students" />
			<CouSecSemoption displaycourse displaysemester displaysection displayeventToggle
				course={course}
				semester={semester}
				section={section}
				updateCourse={updateCourse}
				updateSemester={updateSemester}
				updateSection={updateSection}
			/>
			<Timetable_table timetable={timetable} />
			<Footer />
		</div>
	);
}

export default TimetableList; 1