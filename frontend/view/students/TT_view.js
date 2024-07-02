let timetable;
let flag = 0;
let events = {
	"2024-06-06": { "description": "Software Enginneering (Practical)", "color": "info" },
	"2024-06-08": { "description": "Farewell Party BTech CSE", "color": "warning" },
	"2024-06-19": { "description": "End Term- Compiler Design", "color": "warning" },
	"2024-06-21": { "description": "End Term- Software engineering", "color": "warning" },
	"2024-06-24": { "description": "End Term- Computer network(I)", "color": "warning" },
	"2024-06-26": { "description": "End Term- Fullstack web-dev", "color": "warning" },
	"2024-06-28": { "description": "End Term- Generative AI", "color": "warning" },
	"2024-07-01": { "description": "End Term- Career skills", "color": "warning" },
};
let messageCounter = 0;
let cookieVar = document.cookie.split(';');
if (cookieVar.find(row => row.startsWith('course='))  && cookieVar.find(row => row.startsWith('semester=')) && cookieVar.find(row => row.startsWith('section=')) ) {
	document.getElementById('course_option').value = cookieVar.find(row => row.startsWith('course=')).split('=')[1] ?? "B.Tech";
	document.getElementById('semester_option').value = cookieVar.find(row => row.startsWith('semester=')).split('=')[1] ?? "6";
	document.getElementById('section_option').value = cookieVar.find(row => row.startsWith('section=')).split('=')[1] ?? "A";
}
const letmesee2 = (temp_tt) => {
	// main timetable rendering function
	for (let i = 1; i <= 7; i++) {
		// ======================================== will be used in download optin [ future feature ] ======================================== 
		// document.getElementById("render-course-detail").innerHTML =   "Course : " + document.getElementById("course_option").options[document.getElementById("course_option").selectedIndex].textContent;;
		// document.getElementById("render-semester-detail").innerHTML = "Semester : " + document.getElementById("semester_option").value;
		// document.getElementById("render-section-detail").innerHTML =  "Section : " + document.getElementById("section_option").value;
		// =================================================================================================================================== 

		let currrow = document.getElementById("mytable").rows[i].cells[0].innerHTML.toLowerCase();
		let day_row_border_adding = document.getElementById("mytable").rows[i];
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
				if(temp_tt.schedule[currrow][currcol].slotdata[0].toLowerCase()=='p'){
				document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-success  text-white heading-text border-dark border-3");
				document.getElementById("mytable").rows[i].cells[j].innerHTML = temp_tt.schedule[currrow][currcol].slotdata.replace("\n", "<br>");;
				}
				else{
				document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-danger  text-white heading-text border-dark border-3");
				document.getElementById("mytable").rows[i].cells[j].innerHTML = temp_tt.schedule[currrow][currcol].slotdata.replace("\n", "<br>");;
				}
			}
			else {
				holidaychecker++;
				document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-primary bg-gradient text-white heading-text border-dark border-3");
				document.getElementById("mytable").rows[i].cells[j].innerHTML = '';
			}
			if (currrow === day_slot) {
				day_row_border_adding.cells[0].classList.add("bg-warning");							//dayslot color
			}
			if (currcol === time_slot && currrow === day_slot && today.getHours() < 19) { // color the time and day and period slots 
				document.getElementById("mytable").rows[0].cells[j].classList.add("bg-warning");	//timeslot color
				document.getElementById("mytable").rows[i].cells[j].classList.add("bg-peela");		// day-time	slot color
			}
		}
		if (holidaychecker === 10) {
			let row = document.getElementById("mytable").rows[i];
			for (let k = 1; k <= 10; k++) {
				row.cells[k].className = "";
				row.cells[k].innerHTML = "";
				row.cells[k].className = 'text text-dark bg-warning fw-bold text-dark border-warning border-2 align-middle h5 py-2';
			}
			let words = 'No Class Today'.split(' ');
			let cellIndex = Math.floor((10 - words.length) / 2) + 1 // Start updating from the second cell (first is for day label)

			for (let word of words) {
				if (cellIndex < row.cells.length) {
					row.cells[cellIndex].innerHTML = word;
				}
				cellIndex++;
			}
		}
	}
	if (temp_tt && temp_tt.teacher_subject_data) {
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
		float_error_card_func("Timetable not found", "The timetable you are looking for is not available. Please try again later or contact admin.", "danger");
		//empty the table and color the cells
		let temp_teachertable = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
		temp_teachertable.innerHTML = "";
		const table = document.getElementById("mytable");
		const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

		for (let i = 0; i < rows.length; i++) {
			const cells = rows[i].getElementsByTagName("td");
			for (let j = 0; j < cells.length; j++) {
				const cell = cells[j];
				cell.classList.remove('bg-primary');
				cell.classList.remove('bg-gradient');
				if (i === 0 || i === 1) {
					cell.classList.add('bg-success');
				} else if (i === 2 || i === 3) {
					cell.classList.add('bg-warning');
				} else if (i === 4 || i === 5) {
					cell.classList.add('bg-danger');
				} else if (i === 6) {
					cell.classList.add('bg-primary');
				}
			}
		}
	}
};
// letmesee2(temp_tt)

const college_event_manager = () => {
	let today = new Date();
	let startDayIndex = today.getDay() - 1;
	console.log(startDayIndex);
	for (let i = 0; i < 7; i++) {
		let currentDate = new Date();
		currentDate.setDate(today.getDate() + i);
		let currentDateString = currentDate.toISOString().split('T')[0];
		console.log(currentDateString);
		if (events[currentDateString]) {
			let rowIndex = (startDayIndex + i) % 7 + 1;
			let row = document.getElementById("mytable").rows[rowIndex];
			let color = events[currentDateString].color || "warning";

			for (let j = 1; j <= 10; j++) {
				row.cells[j].className = "";
				row.cells[j].innerHTML = "";
				row.cells[j].className = `text bg-${color} fw-bold text-dark border-${color} border-2 align-middle`;
			}

			// Split the description into words
			let words = events[currentDateString].description.split(' ');
			let cellIndex = Math.floor((10 - words.length) / 2) + 1 // Start updating from the second cell (first is for day label)

			for (let word of words) {
				if (cellIndex < row.cells.length) {
					row.cells[cellIndex].innerHTML = word;
					row.cells[cellIndex].className = "";
					row.cells[cellIndex].className = `text bg-${color} fw-bold text-dark border-${color} border-2 align-middle h5 py-2`;
				}
				cellIndex++;
			}
		}
	}
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

	fetch(`${localhost}/table/get-timetable?` + new URLSearchParams({ course: course, semester: semester, section: section }), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			timetable = data.data;        // Do something with the response data here 
			// console.log(data);
			float_error_card_func("Timetable Loaded Successfully", "The timetable you are looking for is available and successfully fetched from database.", "success");
			letmesee2(timetable);
		})
		.then(() => {
			if (flag === 1) {
				college_event_manager();
				setTimeout(() => { float_error_card_func("Events view On", "", "success") }, 2000);
			} else {
				setTimeout(() => { float_error_card_func("Events view Off", "", "danger") }, 2000);
			}
		})
		.then(() => {
			unblocking();
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
			}, 1500);
		})
		.catch(error => {
			unblocking();
			document.getElementById("loader").style.display = "none";
			float_error_card_func("Timetable not found", "The timetable you are looking for is not found. Please try again later.", "danger");
			console.error('Data unavailable:', error)
		});
}
letmeseeitbaby();
// document.getElementById('letmesee').addEventListener('click', letmeseeitbaby);
document.getElementById('course_option').addEventListener('change', letmeseeitbaby);
document.getElementById('semester_option').addEventListener('change', letmeseeitbaby);
document.getElementById('section_option').addEventListener('change', letmeseeitbaby);

// ======================================== will be used in download optin [ future feature ] ======================================== 
// document.getElementById("download").addEventListener("click", function() {
// 	const element = document.getElementById("ttdiv"); // Get the HTML element to convert to PDF
//     const opt = {
// 		margin: [0,0.5], // Optional - set the margin (in inches)
//         filename: 'timetable.pdf', // Optional - set the filename of the PDF
//         image: { type: 'jpeg', quality: 1 }, // Optional - set image quality
//         html2canvas: { scale: 2 }, // Optional - set the scale for html2canvas
//         jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' } // Optional - set PDF format and orientation
//     };

//     html2pdf().from(element).set(opt).save();
// });
// =================================================================================================================================== 
document.getElementById("toggle_event").addEventListener("click", function () {
	flag = flag === 1 ? 0 : 1;
	letmeseeitbaby();
});
