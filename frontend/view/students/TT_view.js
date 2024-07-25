let timetable;
let flag = 0;
let room_list;
let events = {
	"2024-06-06": { "description": "Software Enginneering (Practical)", "color": "info" },
	"2024-06-08": { "description": "Farewell Party BTech CSE", "color": "holiday" },
	"2024-06-19": { "description": "End Term- Compiler Design", "color": "holiday" },
	"2024-06-21": { "description": "End Term- Software engineering", "color": "holiday" },
	"2024-06-24": { "description": "End Term- Computer network(I)", "color": "holiday" },
	"2024-07-18": { "description": "End-Term Theory Exam : Fullstack web-dev", "color": "holiday" },
	"2024-07-19": { "description": "End-Term Theory Exam : Generative AI", "color": "danger" },
	"2024-07-20": { "description": "End-Term Theory Exam: Career Skills", "color": "danger" },
    "2024-07-21": { "description": "Project Submission Deadline", "color": "warning" },
    "2024-07-22": { "description": "Mock Interview Session", "color": "info" },
    "2024-07-23": { "description": "Resume Building Workshop", "color": "info" },
    "2024-07-24": { "description": "Technical Seminar", "color": "primary" },
    "2024-07-25": { "description": "Networking Event with Alumni", "color": "success" },
    "2024-07-26": { "description": "End of Summer Term", "color": "primary" },
    "2024-07-27": { "description": "End of Summer Term", "color": "secondary" },
    "2024-07-28": { "description": "Results Declaration", "color": "warning" },
    "2024-07-30": { "description": "Summer Internship Begins", "color": "info" },
    "2024-08-01": { "description": "New Semester Orientation", "color": "primary" },
    "2024-08-03": { "description": "Club Sign-ups", "color": "success" },
    "2024-08-05": { "description": "First Day of Classes", "color": "info" },
    "2024-08-07": { "description": "Library Orientation", "color": "info" },
    "2024-08-09": { "description": "Guest Lecture: Future of AI", "color": "primary" },
    "2024-08-12": { "description": "Project Team Formation", "color": "warning" },
    "2024-08-14": { "description": "Independence Day Eve Celebration", "color": "success" },
    "2024-08-15": { "description": "Independence Day (Holiday)", "color": "danger" },
    "2024-08-17": { "description": "Hackathon Kickoff", "color": "warning" },
    "2024-08-18": { "description": "Hackathon Finale", "color": "warning" },
    "2024-08-20": { "description": "Career Fair", "color": "primary" },
    "2024-08-22": { "description": "Mid-term Project Proposal Due", "color": "danger" },
    "2024-08-24": { "description": "Sports Day", "color": "success" },
    "2024-08-26": { "description": "Workshop: Blockchain Basics", "color": "info" },
    "2024-08-28": { "description": "Student Council Elections", "color": "primary" },
    "2024-08-30": { "description": "Research Symposium", "color": "info" },
    "2024-09-01": { "description": "Club Day", "color": "success" },
    "2024-09-03": { "description": "Industry Connect Session", "color": "primary" },
    "2024-09-05": { "description": "Teachers' Day Celebration", "color": "success" },
    "2024-09-07": { "description": "Coding Competition", "color": "warning" },
    "2024-09-08": { "description": "Community Service Day", "color": "info" },
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
					if (temp_tt && temp_tt.schedule && temp_tt.schedule[currrow] && temp_tt.schedule[currrow][currcol] && temp_tt.schedule[currrow][currcol].slotdata) {
						let currcelltb = document.getElementById("mytable").rows[i].cells[j];
						if (temp_tt.schedule[currrow][currcol].slotdata[0].toLowerCase() == 'p') {
							currcelltb.setAttribute("class", "text bg-practical bg-gradient heading-text border-dark border-3");
							currcelltb.innerHTML = temp_tt.schedule[currrow][currcol].slotdata.replace("\n", "<br>");;
						}
						else {
							currcelltb.setAttribute("class", "text bg-theory bg-gradient heading-text border-dark border-3");
							console.log(`${temp_tt.schedule[currrow][currcol].subjectcode}`+`${room_list.find(room => room.roomid == temp_tt.schedule[currrow][currcol].class_id).schedule[currrow][currcol].section}`);
							currcelltb.innerHTML = `${temp_tt.schedule[currrow][currcol].subjectcode}`+`<br>`+room_list.find(room => room.roomid == temp_tt.schedule[currrow][currcol].class_id).name;
							let sections = room_list.find(room => room.roomid == temp_tt.schedule[currrow][currcol].class_id).schedule[currrow][currcol].section.sort()
							if (sections.length > 1) {
								currcelltb.innerHTML += " "+ `(${sections})` ;
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
	if(today.getDay() == 0) startDayIndex = 6;	  	//sunday is 0 in js but we need it to be 6 for our table
	// console.log(startDayIndex);
	for (let i = 0; i < 7; i++) {
		let currentDate = new Date();
		currentDate.setDate(today.getDate() + i);
		let year = currentDate.getFullYear();
		let month = String(currentDate.getMonth() + 1).padStart(2, '0');
		let day = String(currentDate.getDate()).padStart(2, '0');
		let currentDateString =  `${year}-${month}-${day}`;
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
			console.log("Room Data Fetched",data);
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
document.addEventListener("DOMContentLoaded", async() => {
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
