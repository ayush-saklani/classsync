let timetable ;

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
		
		for (let j = 1; j <= 10; j++) {
			let currcol = document.getElementById("mytable").rows[0].cells[j].innerHTML.toLowerCase();
			if (temp_tt && temp_tt.schedule && temp_tt.schedule[currrow] && temp_tt.schedule[currrow][currcol] && temp_tt.schedule[currrow][currcol].slotdata) {
				document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-danger  text-white heading-text border-dark border-3");
				document.getElementById("mytable").rows[i].cells[j].innerHTML = temp_tt.schedule[currrow][currcol].slotdata.replace(" ", "<br>");;
			}
			else {
				document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-primary bg-gradient text-white heading-text border-dark border-3");
				document.getElementById("mytable").rows[i].cells[j].innerHTML = '';
			}
			
			if (currcol === time_slot && currrow === day_slot && today.getHours()<19) { // color the time and day and period slots 
				day_row_border_adding.cells[0].classList.add("bg-warning");							//dayslot color
				document.getElementById("mytable").rows[0].cells[j].classList.add("bg-warning");	//timeslot color
				document.getElementById("mytable").rows[i].cells[j].classList.add("bg-peela");		// day-time	slot color
			}
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

const letmeseeitbaby = () => {
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
			timetable = data;        // Do something with the response data here 
			console.log(data);
			letmesee2(timetable);
			render_tables();
		})
		.catch(error => console.error('Data unavailable:', error));
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
