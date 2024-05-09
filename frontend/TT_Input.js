// Sample data for generating dropdowns will be fetched from apis and database
let globaljsonData;
let faculty_data;
let subjectdata = [
	{
		"subjectcode": "TCS601",
		"subjectname": "COMPILER DESIGN",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "TCS604",
		"subjectname": "COMPUTER NETWORKS I",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "TCS693",
		"subjectname": "FULL STACK WEB DEVELOPMENT",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "XCS601Q",
		"subjectname": "CAREER SKILLS QUANT",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "XCS601V",
		"subjectname": "CAREER SKILLS VERBAL",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "PCS601",
		"subjectname": "COMPILER DESIGN LAB",
		"weekly_hrs": 3,
		"theory_practical": "practical"
	},
	{
		"subjectcode": "PCS611",
		"subjectname": "SOFTWARE ENGINEERING LAB",
		"weekly_hrs": 3,
		"theory_practical": "practical"
	},
	{
		"subjectcode": "PCS693",
		"subjectname": "FULL STACK WEB LAB",
		"weekly_hrs": 3,
		"theory_practical": "practical"
	},
	{
		"subjectcode": "PXCS601",
		"subjectname": "CAREER SKILLS LAB",
		"weekly_hrs": 3,
		"theory_practical": "practical"
	},
	{
		"subjectcode": "ELECT",
		"subjectname": "ELECTIVE (ALL)",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "TCS651",
		"subjectname": "DEVOPS ON CLOUD (ELECTIVE)",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "TCS675",
		"subjectname": "VIRTUAL REALITY (ELECTIVE)",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "TCS692",
		"subjectname": "GEN. A.I (ELECTIVE)",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "TCS619",
		"subjectname": "NETWORK AND SYSTEM SECURITY (ELECTIVE)",
		"weekly_hrs": 3,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "PLCEC",
		"subjectname": "PLACEMENT CLASSES ( CODING )",
		"weekly_hrs": 4,
		"theory_practical": "theory"
	},
	{
		"subjectcode": "PLCEP",
		"subjectname": "PLACEMENT CLASSES ( PROJECTS )",
		"weekly_hrs": 4,
		"theory_practical": "theory"
	}
]
let room_list;

//  the function below updates the teacher subject table acc to the subject choosen 
const update_detail_table = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	for (let i = 0; i < table.rows.length; i++) {
		let row = table.rows[i];
		let rowfirstdata = row.cells[0].firstChild.value;
		for (let ele in subjectdata) {
			if (subjectdata[ele].subjectcode == rowfirstdata) {
				row.cells[2].firstChild.innerHTML = subjectdata[ele].subjectcode.toUpperCase();
				row.cells[3].firstChild.innerHTML = subjectdata[ele].weekly_hrs;
				row.cells[4].firstChild.innerHTML = subjectdata[ele].theory_practical.charAt(0).toUpperCase() + subjectdata[ele].theory_practical.slice(1);
			}
		}
	}
}

//  this function creates a row of table for teacher-subject table dynamically and add the options to the subjects and faculty data 
// then calls the update detail table function
const add_row_func = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	let newRow = table.insertRow(table.rows.length);

	// Subject name drop-down
	let cell = newRow.insertCell();
	let html = `<select class="form-select text">`;
	for (let ele in subjectdata) {
		html += `<option value="${subjectdata[ele].subjectcode}">${subjectdata[ele].subjectname}</option>`;
	}
	html += `</select>`;
	cell.innerHTML = html;

	// Teacher name drop-down
	cell = newRow.insertCell();
	html = `<select class="form-select text">`;
	for (let code in faculty_data) {
		let name = faculty_data[code];
		html += `<option value="${code}">${name}</option>`;
	}
	html += `</select>`;
	cell.innerHTML = html;

	// Empty span tags for cells
	for (let i = 2; i < 5; i++) {
		let cell = newRow.insertCell();
		cell.innerHTML = `<span class="text"></span>`;
	}
	update_detail_table();
};

// add eventlistner to all the select box that updates the rows and data on content change in all selectboxs
const updateItAll = () => {
	let selectors = document.getElementsByClassName("form-select");
	for (let i = 0; i < selectors.length; i++) {
		selectors[i].addEventListener("change", update_detail_table);
	}
}

//  function below calculate and construct the teacher subject relation table json and send that to the backend via post 
// 	============================	[ post request pending ]	============================ 
const save_sub_teacher_table_func = () => {
	let tempjsonData = [];

	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	// Iterate over each row in the table body
	for (let i = 0; i < tableBody.rows.length; i++) {
		let row = tableBody.rows[i];

		let subjectid = row.cells[0].firstChild.value;
		let subjectname = '';
		let teacherid = row.cells[1].firstChild.value;
		let teachername = faculty_data[teacherid];
		let hours = row.cells[3].firstChild.innerHTML;
		let theory_practical = row.cells[4].firstChild.innerHTML;
		for (let ele of subjectdata) {
			if (ele.subjectcode === subjectid) {
				subjectname = ele.subjectname;
				break;
			}
		}
		

		let rowData = {
			"subjectcode": subjectid,
			"teacherid": teacherid,
			"weekly_hrs": hours,
			"teachername": teachername,
			"subjectname": subjectname,
			"theory_practical": theory_practical,
		}
		tempjsonData.push(rowData);
	}

	let jsonData = {
		"course": document.getElementById("course_option").value,
		"semester": document.getElementById("semester_option").value,
		"section": document.getElementById("section_option").value,
		"teacher_subject_data": tempjsonData,
	};
	// jsonData.push(tempjsonData);
	console.log(JSON.stringify(jsonData, null, 2));
	globaljsonData = jsonData;
	// jsonData ka post request marna hai for teacher subject data  

	let testinglist = [];
	tempjsonData.forEach(element => {
		testinglist.push(element.subjectname);
	});
	add_subjects_options_to_myteacher_table(testinglist);
};

//  this function below adds the select option field to each table cell in the table  and also give them appropriate classes 
// 	for additional essential funcitonality such as selecting all select box to add options dynamically to them 
const add_select_box_to_myteacher_table = () => {
	let mytable = document.getElementById("mytable");
	for (let i = 1; i < mytable.rows.length; i++) {
		for (let j = 1; j < mytable.rows[1].cells.length; j++) {
			let tempcell = mytable.rows[i].cells[j];
			let select = document.createElement('select');
			select.setAttribute('class', 'form-select form-select-sm text subjectselectbox');
			tempcell.appendChild(select);
			let select2 = document.createElement('select');
			select2.setAttribute('class', 'form-select form-select-sm text roomselectbox');
			tempcell.appendChild(select2);
		}
	}
}

//  these two function below adds the options to the previously created select option field to each table cell in the table 
// 	this add options to subject select box and room select box in the main table dynamically with the data obtained from mongoDB
const add_rooms_options_to_myteacher_table = (room_list) => {
	let classselectboxes = document.querySelectorAll(".subjectselectbox");
	classselectboxes.forEach(select => {
		select.innerHTML = "";
		Object.entries(room_list).forEach(([key, value]) => {
			let option = document.createElement("option");
			option.value = key;
			option.text = value.charAt(0).toUpperCase() + value.slice(1);
			select.appendChild(option);
		});
	});
};
const add_subjects_options_to_myteacher_table = (subject_list) => {
	let roomselectbox = document.querySelectorAll(".roomselectbox");
	roomselectbox.forEach(select => {
		select.innerHTML = "";
		Object.entries(subject_list).forEach(([key, value]) => {
			let option = document.createElement("option");
			option.value = key;
			option.text = value.charAt(0).toUpperCase() + value.slice(1);
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
			let value = {}
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					value = data[key];
				}
			}
			// console.log(value)
			// console.log(room_list)
			room_list = value
			add_rooms_options_to_myteacher_table(room_list);
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
			let value = {}
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					value[key] = data[key];
				}
			}
			// console.log(value)
			faculty_data = data;
		})
		.catch(error => console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error));
};