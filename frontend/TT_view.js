let timetable ;
let flag=0;
let events = {
	// "2024-06-01": { "description": "2024-06-01 event testing adipisicing elit Pariatur similique" },
	// "2024-06-02": { "description": "2024-06-02 event testing adipisicing elit Pariatur similique" },
	// "2024-06-03": { "description": "2024-06-03 event testing adipisicing elit Pariatur similique" },
	// "2024-06-04": { "description": "2024-06-04 event testing adipisicing elit Pariatur similique" },
	// "2024-06-05": { "description": "2024-06-05 event testing adipisicing elit Pariatur similique" },
	"2024-06-06": { "description": "Software Enginneering (Practical)" },
	"2024-06-19": { "description": "Theory Paper start" },
	// "2024-06-08": { "description": "2024-06-08 event testing adipisicing elit Pariatur similique" }
};  
let messageCounter = 0;
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
				document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-danger  text-white heading-text border-dark border-3");
				document.getElementById("mytable").rows[i].cells[j].innerHTML = temp_tt.schedule[currrow][currcol].slotdata.replace("\n", "<br>");;
			}
			else {
				holidaychecker++;
				document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-primary bg-gradient text-white heading-text border-dark border-3");
				document.getElementById("mytable").rows[i].cells[j].innerHTML = '';
			}
			
			if (currcol === time_slot && currrow === day_slot && today.getHours()<19) { // color the time and day and period slots 
				day_row_border_adding.cells[0].classList.add("bg-warning");							//dayslot color
				document.getElementById("mytable").rows[0].cells[j].classList.add("bg-warning");	//timeslot color
				document.getElementById("mytable").rows[i].cells[j].classList.add("bg-peela");		// day-time	slot color
			}
		}
		if(holidaychecker === 10){
			let row = document.getElementById("mytable").rows[i];
			for (let k = 1; k <= 10; k++) {
				row.cells[k].className = "";
				row.cells[k].innerHTML = "";
				row.cells[k].className = 'text bg-warning fw-bold text-dark-emphasis border-warning border-3 align-middle';
			}
			// document.getElementById("mytable").rows[i].cells[1].setAttribute("class", "text bg-primary bg-gradient text-white heading-text border-dark border-3");
			document.getElementById("mytable").rows[i].cells[5].innerHTML = 'Holiday';
		}
	}
	if(temp_tt && temp_tt.teacher_subject_data){
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
	else{
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
    // let todayString = today.toISOString().split('T')[0];
    
    // const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT","SUN"];
    let startDayIndex = today.getDay()-1;
    console.log(startDayIndex);
    for (let i = 0; i < 7; i++) {
		let currentDate = new Date();
		currentDate.setDate(today.getDate() + i);
		let currentDateString = currentDate.toISOString().split('T')[0];
		console.log(currentDateString);	
		if (events[currentDateString]) {
			let rowIndex = (startDayIndex + i) % 7 + 1;
			let row = document.getElementById("mytable").rows[rowIndex];
			
			for (let j = 1; j <= 10; j++) {
				row.cells[j].className = "";
				row.cells[j].innerHTML = "";
				row.cells[j].className = 'text bg-warning fw-bold text-dark border-warning border-3 align-middle';
			}
			
			// Split the description into words
			let words = events[currentDateString].description.split(' ');
			let cellIndex = Math.floor((10-words.length)/2)+1 // Start updating from the second cell (first is for day label)
			
			for (let word of words) {
				if (cellIndex < row.cells.length) {
					row.cells[cellIndex].innerHTML = word;
					row.cells[cellIndex].className = "";
					row.cells[cellIndex].className = 'text bg-warning fw-bold text-dark border-warning border-3 align-middle';
				}
				cellIndex++;
			}
		}
	}	
};

const letmeseeitbaby = () => {
	// document.getElementById("loader").style.display = "flex"; // uncomment this line to show the loader for every change
	let course = document.getElementById("course_option").value;
	let semester = document.getElementById("semester_option").value;
	let section = document.getElementById("section_option").value;

	fetch('http://127.0.0.1:3000/table/get-timetable?' + new URLSearchParams({ course: course, semester: semester, section: section }), {
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
			if(flag === 1){
				college_event_manager();
				setTimeout(()=>{float_error_card_func("Events view On", "", "success")}, 2000);
			}else{
				setTimeout(()=>{float_error_card_func("Events view Off", "", "danger")}, 2000);
			}
		})
		.then(() => {
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
			}, 1500);
		})
		.catch(error => {
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
document.getElementById("toggle_event").addEventListener("click", function() {
	flag = flag === 1 ? 0 : 1;
	letmeseeitbaby();
});
