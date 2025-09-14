let timetable;
let flag = 0;
let room_list;
let events = {
  "2025-05-13": { "description": "AI Ethics Workshop", "color": "info" },
  "2025-05-14": { "description": "Resume Review Session", "color": "info" },
  "2025-05-15": { "description": "Mid-Term: Software Engineering", "color": "danger" },
  "2025-05-16": { "description": "Coding Sprint: Day 1", "color": "warning" },
  "2025-05-17": { "description": "Coding Sprint: Day 2", "color": "warning" },
  "2025-05-18": { "description": "Open Source Contribution Day", "color": "success" },
  "2025-05-20": { "description": "Mock Interview Drill", "color": "info" },
  "2025-05-21": { "description": "Guest Lecture: DevOps Trends", "color": "primary" },
  "2025-05-22": { "description": "End-Term: Compiler Design", "color": "danger" },
  "2025-05-23": { "description": "Career Guidance Workshop", "color": "info" },
  "2025-05-24": { "description": "Cultural Evening", "color": "success" },
  "2025-05-25": { "description": "Project Milestone Submission", "color": "warning" },
  "2025-05-26": { "description": "Hackathon Kickoff", "color": "primary" },
  "2025-05-27": { "description": "Hackathon Finale", "color": "primary" },
  "2025-05-28": { "description": "Blockchain Basics Workshop", "color": "info" },
  "2025-05-29": { "description": "End-Term: Computer Networks", "color": "danger" },
  "2025-05-30": { "description": "Poster Presentation Day", "color": "secondary" },
  "2025-05-31": { "description": "Start of Summer Projects", "color": "info" },
  "2025-06-01": { "description": "Club Orientation", "color": "success" },
  "2025-06-02": { "description": "AI Quiz Challenge", "color": "warning" },
  "2025-06-03": { "description": "End-Term: Generative AI", "color": "danger" },
  "2025-06-04": { "description": "Department Town Hall", "color": "primary" },
  "2025-06-05": { "description": "Research Panel Discussion", "color": "info" },
  "2025-06-06": { "description": "Farewell: Final Year Students", "color": "holiday" },
  "2025-06-07": { "description": "Internship Showcase", "color": "success" },
  "2025-06-08": { "description": "Networking Event with Alumni", "color": "primary" },
  "2025-06-09": { "description": "Project Feedback Round", "color": "warning" },
  "2025-06-10": { "description": "Teachers' Appreciation Day", "color": "success" },
  "2025-06-11": { "description": "Career Fair 2025", "color": "primary" },
  "2025-06-12": { "description": "Results Announcement", "color": "warning" }
};
let teacheroff = {
	"2024-07-18": { "time_slot": "08-09", "teacherid": "2118422", "semester": "6", "course": "btechcse", "section": ["A"] },
	"2024-07-19": { "time_slot": "12-01", "teacherid": "2118423", "semester": "6", "course": "btechcse", "section": ["A"] },
	"2024-07-20": { "time_slot": "08-09", "teacherid": "2118424", "semester": "6", "course": "btechcse", "section": ["A"] },
	"2024-07-21": { "time_slot": "08-09", "teacherid": "2118425", "semester": "6", "course": "btechcse", "section": ["A"] },
	"2024-07-22": { "time_slot": "08-09", "teacherid": "2118426", "semester": "6", "course": "btechcse", "section": ["A"] }
}
let messageCounter = 0;

const letmesee2 = (temp_tt) => {
	return new Promise((resolve, reject) => {
		// main timetable rendering function
		if (temp_tt && temp_tt.teacher_subject_data) {
			float_error_card_func("Timetable Loaded Successfully", "", "success");
			for (let i = 1; i <= 7; i++) {
				let currrow = document.getElementById("mytable").rows[i].cells[0].innerHTML.toLowerCase();
				let day_row_border_adding = document.getElementById("mytable").rows[i];

				day_row_border_adding.cells[1].innerHTML = "";
				day_row_border_adding.cells[1].colSpan = 1;
				for (let i = 2; i <= 10; i++) {
					day_row_border_adding.cells[i].style.display = "";
				}

				let today = new Date();
				const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
				let day_slot = weekdays[today.getDay()];
				let hours = today.getHours();
				let houre = hours + 1;
				hours = (hours > 12) ? String(hours - 12).padStart(2, "0") : String(hours).padStart(2, "0");
				houre = (houre > 12) ? String(houre - 12).padStart(2, "0") : String(houre).padStart(2, "0");
				let time_slot = hours + "-" + houre;
				time_slot = (time_slot).toString();
				let holidaychecker = 0;

				for (let j = 1; j <= 10; j++) {
					let currcol = document.getElementById("mytable").rows[0].cells[j].innerHTML.toLowerCase();
					if (temp_tt && temp_tt.schedule && temp_tt.schedule[currrow] && temp_tt.schedule[currrow][currcol] && temp_tt.schedule[currrow][currcol].subjectcode) {
						let currcelltb = document.getElementById("mytable").rows[i].cells[j];
						console.log(temp_tt.teacher_subject_data.find(teacher => teacher.subjectcode == temp_tt.schedule[currrow][currcol].subjectcode).theory_practical);
						if (temp_tt.teacher_subject_data.find(teacher => teacher.subjectcode == temp_tt.schedule[currrow][currcol].subjectcode).theory_practical == "PRACTICAL") {
							currcelltb.setAttribute("class", "text bg-practical bg-gradient heading-text border-dark border-3 align-middle");
							currcelltb.innerHTML = `${temp_tt.schedule[currrow][currcol].subjectcode}`
							currcelltb.innerHTML += `<br>` + room_list.find(room => room.roomid == temp_tt.schedule[currrow][currcol].class_id).name;
							let sections = room_list.find(room => room.roomid == temp_tt.schedule[currrow][currcol].class_id).schedule[currrow][currcol].section.sort()
							if (sections.length > 1) {
								currcelltb.innerHTML += `<br>` + `(${sections})`;
							}
						}
						else {
							currcelltb.setAttribute("class", "text bg-theory bg-gradient heading-text border-dark border-3 align-middle");
							currcelltb.innerHTML = `${temp_tt.schedule[currrow][currcol].subjectcode}`
							currcelltb.innerHTML += `<br>` + room_list.find(room => room.roomid == temp_tt.schedule[currrow][currcol].class_id).name;
							let sections = room_list.find(room => room.roomid == temp_tt.schedule[currrow][currcol].class_id).schedule[currrow][currcol].section.sort()
							if (sections.length > 1) {
								currcelltb.innerHTML += `<br>` + `(${sections})`;
							}
						}
					}
					else {
						let currcelltb = document.getElementById("mytable").rows[i].cells[j];
						holidaychecker++;
						currcelltb.setAttribute("class", "text bg-empty bg-gradient heading-text border-dark border-3");
						currcelltb.innerHTML = '';
					}
					if (currrow === day_slot) {
						day_row_border_adding.cells[0].classList.add("bg-indicator");							//dayslot color
					}
					if (currcol === time_slot && currrow === day_slot && today.getHours() < 19) { // color the time and day and period slots 
						document.getElementById("mytable").rows[0].cells[j].classList.add("bg-indicator");	//timeslot color
						document.getElementById("mytable").rows[i].cells[j].classList = ("text bg-indicator bg-gradient heading-text border-dark border-3");		// day-time	slot color
					}
				}
				if (holidaychecker === 10) {
					let tablerow = document.getElementById("mytable").rows[i];
					tablerow.cells[1].className = 'text bg-holiday fw-bold align-middle h5 py-2';
					tablerow.cells[1].innerHTML = "No Class Today";
					tablerow.cells[1].colSpan = 10;
					for (let i = 2; i <= 10; i++) {
						tablerow.cells[i].style.display = "none";
					}
				}
			}
			// populate the subject teacher table with the data
			let localteacher_subject_data = temp_tt.teacher_subject_data;
			let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
			table.innerHTML = "";
			for (let i = 0; i < localteacher_subject_data.length; i++) {
				let newRow = table.insertRow(table.rows.length);

				let cell = newRow.insertCell();
				cell.setAttribute("class", "table-light text border-dark border-3");
				let select = document.createElement('span');
				select.innerText = localteacher_subject_data[i].subjectname;
				cell.appendChild(select);

				cell = newRow.insertCell();
				cell.setAttribute("class", "table-light text border-dark border-3");
				select = document.createElement('span');
				select.innerText = localteacher_subject_data[i].teachername;
				cell.appendChild(select);

				cell = newRow.insertCell();
				cell.setAttribute("class", "table-light text border-dark border-3");
				select = document.createElement('span');
				select.innerText = localteacher_subject_data[i].subjectcode;
				cell.appendChild(select);

				cell = newRow.insertCell();
				cell.setAttribute("class", "table-light text border-dark border-3");
				select = document.createElement('span');
				select.innerText = localteacher_subject_data[i].weekly_hrs;
				cell.appendChild(select);

				cell = newRow.insertCell();
				cell.setAttribute("class", "table-light text border-dark border-3");
				select = document.createElement('span');
				select.innerText = localteacher_subject_data[i].theory_practical;
				cell.appendChild(select);
			}
		}
		else {
			float_error_card_func("Timetable Not Found", "", "danger");
			//empty the table and color the cells
			let temp_teachertable = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
			temp_teachertable.innerHTML = "";
			const table = document.getElementById("mytable");
			const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

			for (let i = 0; i < rows.length; i++) {
				const cells = rows[i].getElementsByTagName("td");
				for (let j = 0; j < cells.length; j++) {
					const cell = cells[j];
					cell.innerHTML = '';
					cell.classList = '';
					if (i === 0 || i === 1) {
						cell.classList.add('bg-practical');
						cell.classList.add('bg-gradient');
					} else if (i === 2 || i === 3) {
						cell.classList.add('bg-holiday');
						cell.classList.add('bg-gradient');
					} else if (i === 4 || i === 5) {
						cell.classList.add('bg-theory');
						cell.classList.add('bg-gradient');
					} else if (i === 6) {
						cell.classList.add('bg-empty');
						cell.classList.add('bg-gradient');
					}
				}
			}
		}
		resolve();
	});
};
// letmesee2(temp_tt)

const college_event_manager = () => {
	let today = new Date();
	let startDayIndex = today.getDay() - 1;
	if (today.getDay() == 0) startDayIndex = 6;	  	//sunday is 0 in js but we need it to be 6 for our table
	// console.log(startDayIndex);
	for (let i = 0; i < 7; i++) {
		let currentDate = new Date();
		currentDate.setDate(today.getDate() + i);
		let year = currentDate.getFullYear();
		let month = String(currentDate.getMonth() + 1).padStart(2, '0');
		let day = String(currentDate.getDate()).padStart(2, '0');
		let currentDateString = `${year}-${month}-${day}`;
		if (events[currentDateString]) {
			let rowIndex = (startDayIndex + i) % 7 + 1;
			let color = events[currentDateString].color || "holiday";

			let tablerow = document.getElementById("mytable").rows[rowIndex];
			tablerow.cells[1].className = `text bg-${color} fw-bold text-dark border-${color} border-2 align-middle h5 py-2`;
			tablerow.cells[1].innerHTML = currentDateString + " " + events[currentDateString].description;
			tablerow.cells[1].colSpan = 10;
			for (let i = 2; i <= 10; i++) {
				tablerow.cells[i].style.display = "none";
			}
		}
	}
};
const teacherAbsentUpdater = () => {
	let today = new Date();
	let startDayIndex = today.getDay() - 1;

	let table = document.getElementById("mytable").getElementsByTagName('tbody')[0];
	for (let i = 0; i <= 7; i++) {
		let currrow = document.getElementById("mytable").rows[i].cells[0].innerHTML.toLowerCase();

		let currentDate = new Date();
		currentDate.setDate(today.getDate() + i);
		let currentDateString = currentDate.toISOString().split('T')[0];
		// console.log(currentDateString);
		for (let j = 0; j <= 10; j++) {
			let currcol = document.getElementById("mytable").rows[0].cells[j].innerHTML.toLowerCase();

			if (teacheroff[currentDateString] && teacheroff[currentDateString].time_slot == currcol) {
				let rowIndex = (startDayIndex + i) % 7 + 1;
				let row = document.getElementById("mytable").rows[rowIndex].cells[j];
				row.innerHTML = row.innerHTML.split("<br>")[0];
				row.innerHTML += `<br>Free`;
				row.classList = ("text text-light bg-secondary bg-gradient heading-text border-dark border-3 align-middle");
			}
		}
	}
};
const fetch_room_list = () => {                         	//  this function fetches the room list data form the server [ database ] and store the variable to the local variable for future use	
	// document.getElementById("loader").style.display = "flex";
	return new Promise((resolve, reject) => {
		fetch(`${localhost}/room/getall?allowed_course=${document.getElementById('course_option').value}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
			.then(data => {
				data = data.data;
				console.log("Room Data Fetched", data);
				room_list = data;
			}).then(() => {
				setTimeout(() => {
					document.getElementById("loader").style.display = "none";
				}, 2000);
				// float_error_card_func('Room Data Fetched Success', '', 'success');
				resolve();
			}).catch(error => {
				setTimeout(() => {
					document.getElementById("loader").style.display = "none";
				}, 2000);
				float_error_card_func('Room Data Fetching Failed', '', 'danger');
				console.error(':::: Room Data not available (SERVER ERROR) :::: ', error)
				reject();
			});
	});
};
const letmeseeitbaby = () => {
	// document.getElementById("loader").style.display = "flex"; // uncomment this line to show the loader for every change
	blocking();
	let course = document.getElementById("course_option").value;
	let semester = document.getElementById("semester_option").value;
	let section = document.getElementById("section_option").value;
	document.cookie = `course=${course};`
	document.cookie = `semester=${semester};`
	document.cookie = `section=${section};`
	document.cookie = `flag=${flag};`

	fetch(`${localhost}/table/get-timetable?` + new URLSearchParams({ course: course, semester: semester, section: section }), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json())
		.then(async data => {
			timetable = data.data;        // Do something with the response data here 
			await letmesee2(timetable);
			flag == 1 ? college_event_manager() : null;
			setTimeout(() => {
				unblocking();
				document.getElementById("loader").style.display = "none";
			}, 1500);
		}).catch(error => {
			setTimeout(() => {
				unblocking();
				document.getElementById("loader").style.display = "none";
			}, 1000);
			float_error_card_func("Server Error", "", "danger");
			console.error('Data unavailable:', error)
		});
}
document.getElementById('course_option').addEventListener('change', letmeseeitbaby);
document.getElementById('semester_option').addEventListener('change', letmeseeitbaby);
document.getElementById('section_option').addEventListener('change', letmeseeitbaby);

document.getElementById("toggle_event").addEventListener("click", () => {
	flag = (flag == 1) ? 0 : 1;
	letmeseeitbaby();
});
document.addEventListener("DOMContentLoaded", async () => {
	let cookieVar = document.cookie.split(';').map(row => row.trim());
	if (cookieVar.find(row => row.startsWith('course=')) && cookieVar.find(row => row.startsWith('semester=')) && cookieVar.find(row => row.startsWith('section=')) && cookieVar.find(row => row.startsWith('flag='))) {
		document.getElementById('course_option').value = cookieVar.find(row => row.startsWith('course=')).split('=')[1] ?? "btechcse";
		addDynamicSemesterOptions();
		document.getElementById('semester_option').value = cookieVar.find(row => row.startsWith('semester=')).split('=')[1] ?? "3";
		addDynamicSectionOptions();
		flag = cookieVar.find(row => row.startsWith('flag=')).split('=')[1] ?? "0";
		document.getElementById('section_option').value = cookieVar.find(row => row.startsWith('section=')).split('=')[1] ?? "A";
	}
	flag == 1 ? document.getElementById("toggle_event").checked = true : document.getElementById("toggle_event").checked = false;
	await fetch_room_list();
	letmeseeitbaby();
});

// Add a CSS class to ensure uniform cell width
const setUniformCellWidth = () => {
	const table = document.getElementById("mytable");
	const cells = table.getElementsByTagName("td");
	const headers = table.getElementsByTagName("th");

	// Apply uniform width to all cells
	for (let cell of cells) {
		cell.style.width = "100px"; // Set a uniform width, adjust as needed
	}

	// Apply uniform width to all headers
	for (let header of headers) {
		header.style.width = "100px"; // Set a uniform width, adjust as needed
	}
};

// Call the function after the timetable is rendered
setUniformCellWidth();
