let room_list;
let flag = 0;
let events = {
	"2024-06-06": { "description": "Software Enginneering (Practical)", "color": "info" },
	"2024-06-08": { "description": "Farewell Party BTech CSE", "color": "holiday" },
	"2024-06-19": { "description": "End Term- Compiler Design", "color": "holiday" },
	"2024-06-21": { "description": "End Term- Software engineering", "color": "holiday" },
	"2024-06-24": { "description": "End Term- Computer network(I)", "color": "holiday" },
	"2024-06-26": { "description": "End Term- Fullstack web-dev", "color": "holiday" },
	"2024-06-28": { "description": "End Term- Generative AI", "color": "holiday" },
	"2024-07-01": { "description": "End Term- Career skills", "color": "holiday" },
	"2024-07-04": { "description": "End Term- Career skills", "color": "holiday" },
	"2024-07-05": { "description": "Holiday Reason 2024-07-05", "color": "holiday" },
	"2024-07-06": { "description": "Holiday Reason 2024-07-06", "color": "holiday" },
	"2024-07-07": { "description": "Holiday Reason 2024-07-07", "color": "holiday" },
};
let messageCounter = 0;
const letmesee2 = (currroom) => {
	document.getElementById("teacher_detail").rows[0].cells[0].innerHTML = room_list[currroom].name;
	document.getElementById("teacher_detail").rows[0].cells[1].innerHTML = "Capacity : " +room_list[currroom].capacity;
	document.getElementById("teacher_detail").rows[0].cells[2].innerHTML = "Type : "+room_list[currroom].type;
	let total_hours = 0;
	for (let i = 1; i <= 7; i++) {
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
			if (room_list[currroom] && room_list[currroom].schedule && room_list[currroom].schedule[currrow] && room_list[currroom].schedule[currrow][currcol] && room_list[currroom].schedule[currrow][currcol].subjectcode) {
				total_hours++;
				let currcelltb = document.getElementById("mytable").rows[i].cells[j]
				currcelltb.innerHTML = `
						${room_list[currroom].schedule[currrow][currcol].course}
						${room_list[currroom].schedule[currrow][currcol].semester}<br> 
						[ ${room_list[currroom].schedule[currrow][currcol].section} ]<br>
						${room_list[currroom].schedule[currrow][currcol].subjectcode}<br> 
						Teacher : ${room_list[currroom].schedule[currrow][currcol].teacherid}<br>
						`;
						// ${room_list[currroom].schedule[currrow][currcol].teacherid}<br>
					currcelltb.setAttribute("class", "text bg-practical bg-gradient heading-text border-dark border-3");
				
					// add type of class in the DS and change the color here 
					// if(room_list[currroom].schedule[currrow][currcol].subjectcode[0].toLowerCase()=='p'){	//practical class color
					// 	currcelltb.setAttribute("class", "text bg-practical bg-gradient heading-text border-dark border-3");
					// }
					// else{
					// 	currcelltb.setAttribute("class", "text bg-theory bg-gradient heading-text border-dark border-3");
					// }	
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
			let row = document.getElementById("mytable").rows[i];
			for (let k = 1; k <= 10; k++) {
				row.cells[k].className = "";
				row.cells[k].innerHTML = "";
				row.cells[k].className = 'text bg-holiday fw-bold border-holiday border-2 align-middle h5 py-3';
			}
			let words = 'Empty All Day'.split(' ');
			let cellIndex = Math.floor((10 - words.length) / 2) + 1 // Start updating from the second cell (first is for day label)

			for (let word of words) {
				if (cellIndex < row.cells.length) {
					row.cells[cellIndex].innerHTML = word;
				}
				cellIndex++;
			}
		}
	}
	document.getElementById("teacher_detail").rows[0].cells[3].innerHTML = "Used : " + ((total_hours/60)*100).toFixed(2) + "%";
	if (flag === 1) {
		college_event_manager();
	}
};

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
			let color = events[currentDateString].color || "holiday";

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
					row.cells[cellIndex].className = `text bg-${color} fw-bold text-dark border-${color} border-2 align-middle h5 py-3`;
				}
				cellIndex++;
			}
		}
	}
};
const fetch_room_list = () => {                         	//  this function fetches the room list data form the server [ database ] and store the variable to the local variable for future use	
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
		float_error_card_func("Room Data Available", "", "success");
	}).then(() => {
		for(room in room_list){
			console.log(room_list[room]);
			if(room_list[room].classname == ''){
				continue;
			}
			// console.log(room_list[room].schedule.mon["08-09"]);
			// console.log(room);
			let option = document.createElement("option");
			option.text = room_list[room].name;
			option.value = room;
			document.getElementById("room_options").add(option);
		}
		setTimeout(() => {
			document.getElementById("loader").style.display = "none";
		});
		document.getElementById("room_options").value = "96";

		letmesee2(document.getElementById("room_options").value);
		resolve();
	}).catch(error => {
		console.error('Room Data not available [ SERVER ERROR ] :::: ', error);
		float_error_card_func("Room Data Unavailable<br>Server Error", "", "danger");
		reject();
	});
	});
};
const letmeseeitbaby = () => {
	let currroom = document.getElementById("room_options").value;
	letmesee2(currroom)
}
document.addEventListener('DOMContentLoaded', () => {
	fetch_room_list()
});
document.getElementById('room_options').addEventListener('change', letmeseeitbaby);
document.getElementById("toggle_event").addEventListener("click", () => {
	flag = flag === 1 ? 0 : 1;
	letmeseeitbaby();
});
// document.getElementById("loader").style.display = "none";