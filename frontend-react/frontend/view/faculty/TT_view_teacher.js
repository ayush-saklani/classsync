let faculty_data;
let room_list;
let flag = 0;
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
    "2024-07-27": { "description": "End of Summer Term", "color": "danger" },
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
let messageCounter = 0;
const render_data = (teacherid) => {
	return new Promise((resolve, reject) => {
		try{
			let tempfaculty_data = faculty_data.find(faculty => faculty.teacherid == teacherid);
			document.getElementById("teacher_detail").rows[0].cells[0].innerHTML = tempfaculty_data.name;
			document.getElementById("teacher_detail").rows[0].cells[1].innerHTML = tempfaculty_data.teacherid;
			let total_hours = 0;
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
					if (tempfaculty_data && tempfaculty_data.schedule && tempfaculty_data.schedule[currrow] && tempfaculty_data.schedule[currrow][currcol] && tempfaculty_data.schedule[currrow][currcol].subjectcode) {
						total_hours++;
						let message = "Room : N.A";
						for(let i = 0 ;i<room_list.length;i++){
							if(room_list[i].roomid == tempfaculty_data.schedule[currrow][currcol].roomid){
								message = `Room : ${room_list[i].name}`;
								break;	
							}
						}
						let currcelltb = document.getElementById("mytable").rows[i].cells[j]
						currcelltb.innerHTML = `
						${tempfaculty_data.schedule[currrow][currcol].subjectcode}<br>
						${tempfaculty_data.schedule[currrow][currcol].course} 
						${tempfaculty_data.schedule[currrow][currcol].semester}<br>
						${message}<br>
						Section : ${tempfaculty_data.schedule[currrow][currcol].section}<br>`;
						if(tempfaculty_data.schedule[currrow][currcol].subjectcode[0].toLowerCase()=='p'){	//practical class color
							currcelltb.setAttribute("class", "text bg-practical bg-gradient heading-text border-dark border-3");
						}
						else{
							currcelltb.setAttribute("class", "text bg-theory bg-gradient heading-text border-dark border-3");
						}	
					}
					else {
						holidaychecker++;
						document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-empty bg-gradient heading-text border-dark border-3");
						document.getElementById("mytable").rows[i].cells[j].innerHTML = '';
					}
					
					if (currrow === day_slot) {
						day_row_border_adding.cells[0].classList.add("bg-indicator");							//dayslot color
					}
					if (currcol === time_slot && currrow === day_slot && today.getHours() < 19) { 				// color the time and day and period slots 
						document.getElementById("mytable").rows[0].cells[j].classList.add("bg-indicator");		//timeslot color
						document.getElementById("mytable").rows[i].cells[j].classList.add("bg-indicator");		// day-time	slot color
					}
				}
				if (holidaychecker === 10) {
					let tablerow = document.getElementById("mytable").rows[i];
					tablerow.cells[1].className = 'text bg-holiday fw-bold align-middle h5 py-3';
					tablerow.cells[1].innerHTML = "No Class Today";
					tablerow.cells[1].colSpan = 10;
					for (let i = 2; i <= 10; i++) {
						tablerow.cells[i].style.display = "none";
					}
				}
			}
			document.getElementById("teacher_detail").rows[0].cells[2].innerHTML = total_hours + " hours";
			resolve();
		}
		catch(error){
			reject();
			console.error(':::: Error in fetching data ::::', error);
		}	
	});
};

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
			tablerow.cells[1].className = `text bg-${color} fw-bold text-dark border-${color} border-2 align-middle h5 py-3`;
			tablerow.cells[1].innerHTML = currentDateString + " " + events[currentDateString].description;
			tablerow.cells[1].colSpan = 10;
			for (let i = 2; i <= 10; i++) {
				tablerow.cells[i].style.display = "none";
			}
		}
	}
};
const fetch_room_list = () => {                         	//  this function fetches the room list data form the server [ database ] and store the variable to the local variable for future use	
	// document.getElementById("loader").style.display = "flex";
	return new Promise((resolve, reject) => {
		fetch(`${localhost}/room/getall`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
		.then(data => {
			data = data.data;
			console.log("Room Data Found");
			room_list = data;
		}).then(() => {
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
			}, 2000);
			float_error_card_func('Room Data Found', '', 'success');
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
const addFacultyToSelect = (faculty_data) => {
	let select = document.getElementById("teacher_option");
	select.innerHTML = "";
	faculty_data.forEach(faculty => {
		if(faculty.teacherid == "0"){
			return;
		}
		let option = document.createElement("option");
		option.value = faculty.teacherid;
		option.text = faculty.name;
		select.appendChild(option);
	});
}
const fetch_faculty_list = () => {
	return new Promise((resolve, reject) => {
		blocking();
		document.cookie = `flag=${flag};`
		document.cookie = `teacher=${document.getElementById("teacher_option").value};`
		
		fetch(`${localhost}/faculty/getall`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
		.then(data => {
			data = data.data;
			console.log(data);
			faculty_data = data;
			faculty_data.sort((a, b) => (a.name > b.name) ? 1 : -1); 
			addFacultyToSelect(faculty_data);
			render_data(document.getElementById("teacher_option").value);
		}).then(() => {
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
				unblocking();
			}, 1500);
			float_error_card_func("Faculty Data Found", "", "success");
			resolve();
		}).catch(error => {
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
				unblocking();
			}, 1500);
			float_error_card_func("Faculty Not Found", "", "danger");
			reject();
			console.error('Data unavailable:', error)
		});
	});
}
const workingfunc = async () => {
	let teacherid = document.getElementById("teacher_option").value;
	await render_data(teacherid);
	if (flag == 1) {
		college_event_manager();
	}
};
document.getElementById('teacher_option').addEventListener('change', workingfunc);
document.getElementById("toggle_event").addEventListener("click", () => {
	flag = flag == 1 ? 0 : 1;
	workingfunc();
});
document.addEventListener('DOMContentLoaded', async () => {
	let cookieVar = document.cookie.split(';').map(row => row.trim());
	if (cookieVar.find(row => row.startsWith('teacher=')) && cookieVar.find(row => row.startsWith('flag='))) {
		document.getElementById('teacher_option').value = cookieVar.find(row => row.startsWith('teacher=')).split('=')[1] ?? "2118570";
		flag = cookieVar.find(row => row.startsWith('flag=')).split('=')[1] ?? "0";
	}
	flag == 1 ? document.getElementById("toggle_event").checked = true : document.getElementById("toggle_event").checked = false;
	await fetch_room_list()
	await fetch_faculty_list();
});