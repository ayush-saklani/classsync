// Sample data for generating dropdowns will be fetched from apis and database
let globaljsonData;
let faculty_data;
let subjectdata;
let room_list;
// let timetable;
let timetable;

//  the function below updates the teacher subject table acc to the subject choosen 
const update_detail_table = () => {
	let tempteachersubjectdata = [];
	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	// Iterate over each row in the table body
	for (let i = 0; i < tableBody.rows.length; i++) {
		let row = tableBody.rows[i];

		let subjectname = row.cells[0].firstChild.innerHTML;
		let teacherid = row.cells[1].firstChild.value;
		let subjectid = row.cells[2].firstChild.innerHTML;
		let teachername = faculty_data[teacherid];
		let weekly_hrs = row.cells[3].firstChild.innerHTML;
		let theory_practical = row.cells[4].firstChild.innerHTML;
	

		let rowData = {
			"subjectcode": subjectid,
			"teacherid": teacherid,
			"weekly_hrs": weekly_hrs,
			"teachername": teachername,
			"subjectname": subjectname,
			"theory_practical": theory_practical,
		}
		tempteachersubjectdata.push(rowData);
	}
	let testinglist = [];
	tempteachersubjectdata.forEach(element => {
		testinglist.push({
			"subjectcode": element.subjectcode,
			"subjectname": element.subjectname,
			"weekly_hrs": element.weekly_hrs,
			"theory_practical": element.theory_practical
		});
	});
	add_subjects_options_to_mytable(testinglist);
	// any_change_event_listner();
}

//  this function creates a row of table for teacher-subject table dynamically and add the options to the subjects and faculty data 
// then calls the update detail table function
const add_row_func = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	let newRow = table.insertRow(table.rows.length);

	// Subject name drop-down
	let cell = newRow.insertCell();
	let select = document.createElement("select");
	select.className = "form-select text";
	for (let ele in subjectdata) {
		let option = document.createElement("option");
		option.value = subjectdata[ele].subjectcode;
		option.text = subjectdata[ele].subjectname;
		select.appendChild(option);
	}
	cell.appendChild(select);

	// Teacher name drop-down
	cell = newRow.insertCell();
	select = document.createElement("select");
	select.className = "form-select text";
	for (let code in faculty_data) {
		let option = document.createElement("option");
		option.value = code;
		option.text = faculty_data[code];
		select.appendChild(option);
	}
	cell.appendChild(select);

	// Empty span tags for cells
	for (let i = 2; i < 5; i++) {
		let cell = newRow.insertCell();
		let span = document.createElement("span");
		span.className = "text";
		cell.appendChild(span);
	}
	update_detail_table();
};
const delete_row_func = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	let rowCount = table.rows.length;
	table.deleteRow(rowCount - 1);
}

// add eventlistner to all the select box that updates the rows and data on content change in all selectboxs
const any_change_event_listner = () => {
	let selectors = document.getElementsByClassName("form-select");
	for (let i = 0; i < selectors.length; i++) {
		selectors[i].addEventListener("change", ()=>{
			update_detail_table()
		});
	}
}

//  function below calculate and construct the main timetable table && teacher subject relation table json 
// and send that to the backend via post request 
// 	============================	[ post request pending ]	============================ 
const save_table_func = () => {
	let tempteachersubjectdata = [];

	let scheduleslot = {}
	for (let i = 1; i < mytable.rows.length; i++) {
		let currrow = mytable.rows[i].cells[0].innerHTML.toLowerCase();
		let tempdayslot = {}
		for (let j = 1; j <= 10; j++) {
			let currcol = mytable.rows[0].cells[j].innerHTML.toLowerCase();
			let sl_class_id = mytable.rows[i].cells[j].childNodes[1].value;
			let sl_subjectcode = mytable.rows[i].cells[j].childNodes[0].value;
			let sl_slotdata = "";
			if (sl_class_id != '0' || sl_subjectcode != '') {
				let curr_box = mytable.rows[i].cells[j].childNodes[1];
				sl_slotdata = `${sl_subjectcode}\n${curr_box.options[curr_box.selectedIndex].textContent}`;
			}
			else {
				sl_slotdata = "";
			}

			tempdayslot[currcol] = {
				"class_id": sl_class_id,
				"subjectcode": sl_subjectcode,
				"slotdata": sl_slotdata
			}
		}
		scheduleslot[currrow] = tempdayslot;
	}


	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	// Iterate over each row in the table body
	for (let i = 0; i < tableBody.rows.length; i++) {
		let row = tableBody.rows[i];

		let subjectname = row.cells[0].firstChild.innerHTML;
		let teacherid = row.cells[1].firstChild.value;
		let subjectid = row.cells[2].firstChild.innerHTML;
		let weekly_hrs = row.cells[3].firstChild.innerHTML;
		let theory_practical = row.cells[4].firstChild.innerHTML;
		let teachername = faculty_data[teacherid];
	

		let rowData = {
			"subjectcode": subjectid,
			"teacherid": teacherid,
			"weekly_hrs": weekly_hrs,
			"teachername": teachername,
			"subjectname": subjectname,
			"theory_practical": theory_practical,
		}
		tempteachersubjectdata.push(rowData);
	}

	let jsonData = {
		"course": document.getElementById("course_option").value,
		"semester": document.getElementById("semester_option").value,
		"section": document.getElementById("section_option").value,
		"schedule": scheduleslot,
		"teacher_subject_data": tempteachersubjectdata,
	};

	console.log(JSON.stringify(jsonData, null, 2));
	globaljsonData = jsonData;
	// jsonData ka post request marna hai for teacher subject data  


	// Convert JSON data to a string
	const jsonDataString = JSON.stringify(jsonData, null, 4);

	// Create a POST request
	fetch('http://127.0.0.1:3000/table/save-timetable', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: jsonDataString
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(':::::  DATA NOT SAVED DUE TO NETWORK ERROR :::::');
			}
		}).then(parsedData => {
			console.log(':::::  DATA SAVED SUCCESSFULLY  :::::', parsedData);

		}).catch(error => {
			console.error('::::: ERROR SAVING DATA :::::', error);
		});
};

const pass_second_table_to_first = () => {
	let tempteachersubjectdata = [];

	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	// Iterate over each row in the table body
	for (let i = 0; i < tableBody.rows.length; i++) {
		let row = tableBody.rows[i];

		let subjectname = row.cells[0].firstChild.innerHTML;
		let teacherid = row.cells[1].firstChild.value;
		let subjectid = row.cells[2].firstChild.innerHTML;
		let weekly_hrs = row.cells[3].firstChild.innerHTML;
		let theory_practical = row.cells[4].firstChild.innerHTML;
		let teachername = faculty_data[teacherid];
	

		let rowData = {
			"subjectcode": subjectid,
			"teacherid": teacherid,
			"weekly_hrs": weekly_hrs,
			"teachername": teachername,
			"subjectname": subjectname,
			"theory_practical": theory_practical,
		}
		tempteachersubjectdata.push(rowData);
	}

	let testinglist = [];
	tempteachersubjectdata.forEach(element => {
		testinglist.push({
			"subjectcode": element.subjectcode,
			"subjectname": element.subjectname,
			"weekly_hrs": element.weekly_hrs,
			"theory_practical": element.theory_practical
		});
	});
	add_subjects_options_to_mytable(testinglist);
}

//  this function below adds the select option field to each table cell in the table  and also give them appropriate classes 
// 	for additional essential funcitonality such as selecting all select box to add options dynamically to them 
const add_select_box_to_mytable = () => {
	let mytable = document.getElementById("mytable");
	for (let i = 1; i < mytable.rows.length; i++) {
		for (let j = 1; j < mytable.rows[1].cells.length; j++) {
			let tempcell = mytable.rows[i].cells[j];
			let select = document.createElement('select');
			select.setAttribute('class', 'form-select form-select-sm text subjectselectbox fw-bold');
			select.setAttribute('style', 'white-space: pre-wrap;');
			tempcell.appendChild(select);
			let select2 = document.createElement('select');
			select2.setAttribute('class', 'form-select form-select-sm text roomselectbox');
			select2.setAttribute('style', 'white-space: pre-wrap;');
			tempcell.appendChild(select2);
		}
	}
}

//  these two function below adds the options to the previously created select option field to each table cell in the table 
// 	this add options to subject select box and room select box in the main table dynamically with the data obtained from mongoDB
const add_rooms_options_to_mytable = (room_list) => {
	let roomselectboxes = document.querySelectorAll(".roomselectbox");
	roomselectboxes.forEach(select => {
		let tempselectedvalue = select.value;
		select.innerHTML = "";
		Object.entries(room_list).forEach(([key, value]) => {
			let option = document.createElement("option");
			option.value = key;
			option.text = value.classname;
			// console.log(option.value, option.text)
			if (key == tempselectedvalue) {
				option.selected = true;
			}
			select.appendChild(option);
		});
	});
};
const add_subjects_options_to_mytable = (subject_list) => {
	let subjectselectbox = document.querySelectorAll(".subjectselectbox");
	subjectselectbox.forEach(select => {
		let tempselectedvalue = select.value;
		select.innerHTML = "";

		// adidng blank option 
		let option = document.createElement("option");
		option.value = "";
		option.text = "";
		if (option.value == tempselectedvalue) {
			option.selected = true;
		}
		select.appendChild(option);
		//
		subject_list.forEach(element => {
			option = document.createElement("option");
			option.value = element.subjectcode;
			option.text = element.subjectcode
			if (element.subjectcode == tempselectedvalue) {
				option.selected = true;
			}
			select.appendChild(option);
		});
	});
};

//  this function fetches the room list data form the server [ database ] and store the variable to the local variable for future use  
const fetch_room_list = () => {
	fetch('http://127.0.0.1:3000/list/get-rooms', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			room_list=data.data[0]
			// console.log(room_list)
			add_rooms_options_to_mytable(room_list);
		})
		.catch(error => console.error('Room Data not available [ SERVER ERROR ] :::: ', error));
};
//  this function fetches the faculty list data form the server [ database ] and store the variable to the local variable for future use  
const fetch_faculties_list = () => {
	fetch('http://127.0.0.1:3000/list/get-faculties', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			data = data.data;
			faculty_data = data[0];
		})
		.catch(error => console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error));
};
//  this function fetches the faculty list data form the server [ database ] and store the variable to the local variable for future use  
const fetch_subject_list = () => {
	fetch('http://127.0.0.1:3000/list/get-subjects', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			subjectdata = data.data;
			// console.log(subjectdata)
		})
		.catch(error => console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error));
};

// renders the timetable on the main table [ uses the same strucute of JSON as it POST to the backend]
const render_tables = () => {
	// rendering the second table first
	if(timetable){
	let localteacher_subject_data = timetable.teacher_subject_data;
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	table.innerHTML = "";
	for (let i = 0; i < localteacher_subject_data.length; i++) {
		const element = localteacher_subject_data[i];

		let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
		let newRow = table.insertRow(table.rows.length);

		// subject select box render
		let cell = newRow.insertCell();
		
		let cell_insert = document.createElement("span");
		cell_insert.setAttribute("class", "text");
		cell_insert.innerHTML = localteacher_subject_data[i].subjectname;
		cell.appendChild(cell_insert);
		cell.setAttribute("class", "border-dark border-3");
		
		// teacher select box render
		cell = newRow.insertCell();
		select = document.createElement('select');
		select.setAttribute('class', 'form-select text');
		cell.appendChild(select);
		for (let ele in faculty_data) {
			let option = document.createElement('option');
			option.value = ele;
			option.text = faculty_data[ele];
			if (ele == localteacher_subject_data[i].teacherid) {
				option.selected = true;
				// console.log(ele)
			}
			select.appendChild(option);
		}
		cell.setAttribute("class", "border-dark border-3 p-0");

		cell = newRow.insertCell();
		cell_insert = document.createElement("span");
		cell_insert.innerHTML = localteacher_subject_data[i].subjectcode;
		cell_insert.setAttribute("class", "text");
		cell.appendChild(cell_insert);
		cell.setAttribute("class", "border-dark border-3 fw-bolder");

		cell = newRow.insertCell();
		cell_insert = document.createElement("span");
		cell_insert.innerHTML = localteacher_subject_data[i].weekly_hrs;
		cell_insert.setAttribute("class", "text");
		cell.appendChild(cell_insert);
		cell.setAttribute("class", "border-dark border-3");

		cell = newRow.insertCell();
		cell_insert = document.createElement("span");
		cell_insert.innerHTML = localteacher_subject_data[i].theory_practical.charAt(0).toUpperCase() + localteacher_subject_data[i].theory_practical.slice(1);
		cell_insert.setAttribute("class", "text");
		cell.appendChild(cell_insert);
		cell.setAttribute("class", "border-dark border-3");

		cell = newRow.insertCell();
		cell_insert = document.createElement("span");
		cell_insert.innerHTML = 0;
		cell_insert.setAttribute("class", "text");
		cell.appendChild(cell_insert);
		cell.setAttribute("class", "border-dark border-3");
	}
	update_detail_table();
	add_subjects_options_to_mytable(localteacher_subject_data)

	// rendering the first main table now 
	let local_time_table_data = timetable.schedule;
	let mytable = document.getElementById("mytable");

	for (let i = 1; i < mytable.rows.length; i++) {
		let curr_day = mytable.rows[i].cells[0].innerHTML.toLowerCase();
		let curr_whole_row = mytable.rows[i];

		for (let j = 1; j <= 10; j++) {
			let curr_timeslot = mytable.rows[0].cells[j].innerHTML.toLowerCase();
			let curr_col_slot = curr_whole_row.cells[j];
			let curr_col_slot_childs = curr_col_slot.childNodes;

			// trying for subjects
			for (let i = 0; i < curr_col_slot_childs[0].options.length; i++) {
				let subject_options = curr_col_slot_childs[0].options;
				let optionValue = subject_options[i].value;
				if (optionValue == local_time_table_data[curr_day][curr_timeslot].subjectcode) {
					// console.log(optionValue);
					// console.log(local_time_table_data[curr_day][curr_timeslot].subjectcode);
					subject_options[i].selected = true;
				}
			}

			// trying for rooms
			for (let i = 0; i < curr_col_slot_childs[1].options.length; i++) {
				let room_options = curr_col_slot_childs[1].options;
				optionValue = room_options[i].value;
				if (optionValue == local_time_table_data[curr_day][curr_timeslot].class_id) {
					// console.log(optionValue);
					// console.log(local_time_table_data[curr_day][curr_timeslot].class_id);
					room_options[i].selected = true;
				}
			}
		}
	}
	}
	else{
		alert("Time Table Data not available")
	}
}
const fetch_timetable = () => {
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
			console.log(timetable);
		})
		.then(() => {
			render_tables();
			// add_select_box_to_mytable();
			// fetch_faculties_list();
			// fetch_room_list();
		})
		.catch(error => console.error('Data unavailable:', error));
}

fetch_room_list();
// fetch_subject_list();
// add_subjects_options_to_mytable(subjectdata);
// add_rooms_options_to_mytable(room_list);
setTimeout(fetch_timetable, 3000); // promises sekh le 