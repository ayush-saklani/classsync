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
let timetable = {
	"course": "btechcse",
	"semester": "1",
	"section": "A",
	"schedule": {
		"mon": {
			"08-09": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"09-10": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"10-11": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"11-12": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"12-01": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"01-02": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"02-03": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"03-04": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"04-05": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"05-06": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			}
		},
		"tue": {
			"08-09": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"09-10": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"10-11": {
				"class_id": "2001",
				"subjectcode": "TCS601",
				"slotdata": "TCS601\nDepartment of visual Art"
			},
			"11-12": {
				"class_id": "5006",
				"subjectcode": "XCS601Q",
				"slotdata": "XCS601Q\nreachers scholer room (room beside audi)"
			},
			"12-01": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"01-02": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"02-03": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"03-04": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"04-05": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"05-06": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			}
		},
		"wed": {
			"08-09": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"09-10": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"10-11": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"11-12": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"12-01": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"01-02": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"02-03": {
				"class_id": "71",
				"subjectcode": "XCS601Q",
				"slotdata": "XCS601Q\nCR103"
			},
			"03-04": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"04-05": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"05-06": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			}
		},
		"thu": {
			"08-09": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"09-10": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"10-11": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"11-12": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"12-01": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"01-02": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"02-03": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"03-04": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"04-05": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"05-06": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			}
		},
		"fri": {
			"08-09": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"09-10": {
				"class_id": "33",
				"subjectcode": "PXCS601",
				"slotdata": "PXCS601\nBosch lab"
			},
			"10-11": {
				"class_id": "33",
				"subjectcode": "PXCS601",
				"slotdata": "PXCS601\nBosch lab"
			},
			"11-12": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"12-01": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"01-02": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"02-03": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"03-04": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"04-05": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"05-06": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			}
		},
		"sat": {
			"08-09": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"09-10": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"10-11": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"11-12": {
				"class_id": "89",
				"subjectcode": "XCS601Q",
				"slotdata": "XCS601Q\nCR106"
			},
			"12-01": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"01-02": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"02-03": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"03-04": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"04-05": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"05-06": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			}
		},
		"sun": {
			"08-09": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"09-10": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"10-11": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"11-12": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"12-01": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"01-02": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"02-03": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"03-04": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"04-05": {
				"class_id": "0",
				"subjectcode": "",
				"slotdata": ""
			},
			"05-06": {
				"class_id": "87",
				"subjectcode": "TCS604",
				"slotdata": "TCS604\nCR105"
			}
		}
	},
	"teacher_subject_data": [
		{
			"subjectcode": "TCS601",
			"teacherid": "2",
			"weekly_hrs": "",
			"teachername": "DR DEVESH P SINGH",
			"subjectname": "COMPILER DESIGN",
			"theory_practical": ""
		},
		{
			"subjectcode": "PXCS601",
			"teacherid": "21011355",
			"weekly_hrs": "",
			"teachername": "MS NEELAM",
			"subjectname": "CAREER SKILLS LAB",
			"theory_practical": ""
		},
		{
			"subjectcode": "XCS601Q",
			"teacherid": "10",
			"weekly_hrs": "",
			"teachername": "MR PA ANAND",
			"subjectname": "CAREER SKILLS QUANT",
			"theory_practical": ""
		},
		{
			"subjectcode": "TCS604",
			"teacherid": "3",
			"weekly_hrs": "",
			"teachername": "DR SATVIK VATS",
			"subjectname": "COMPUTER NETWORKS I",
			"theory_practical": ""
		}
	]
}

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
const delete_row_func = ()=>{
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
    let rowCount = table.rows.length;
    table.deleteRow(rowCount -1);
}
// add eventlistner to all the select box that updates the rows and data on content change in all selectboxs
const updateItAll = () => {
	let selectors = document.getElementsByClassName("form-select");
	for (let i = 0; i < selectors.length; i++) {
		selectors[i].addEventListener("change", update_detail_table);
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

		let subjectid = row.cells[0].firstChild.value;
		let teacherid = row.cells[1].firstChild.value;
		let teachername = faculty_data[teacherid];
		let subjectname = "";
		let weekly_hrs = "";
		let theory_practical = "";
		for (let ele of subjectdata) {
			if (ele.subjectcode === subjectid) {
				subjectname = ele.subjectname;
				weekly_hrs = ele.weekly_hrs
				theory_practical = ele.theory_practical
				break;
			}
		}

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
	fetch('http://127.0.0.1:3000/save-section-data', {
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
		tempteachersubjectdata.push(rowData);
	}

	let testinglist = [
		// {
		// 	"subjectcode": "",
		// 	"subjectname": "",
		// 	"weekly_hrs": "",
		// 	"theory_practical": ""
		// }
	]; // for blank field in mytable diaable becuase this is added in the dinal funciton if working fine delete it  [ WDTL ]
	tempteachersubjectdata.forEach(element => {
		testinglist.push({
			"subjectcode": element.subjectcode,
			"subjectname": element.subjectname,
			"weekly_hrs": element.weekly_hrs,
			"theory_practical": element.theory_practical
		});
	});
	add_subjects_options_to_myteacher_table(testinglist);
}

//  this function below adds the select option field to each table cell in the table  and also give them appropriate classes 
// 	for additional essential funcitonality such as selecting all select box to add options dynamically to them 
const add_select_box_to_myteacher_table = () => {
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
const add_rooms_options_to_myteacher_table = (room_list) => {
	let roomselectboxes = document.querySelectorAll(".roomselectbox");
	roomselectboxes.forEach(select => {
		let tempselectedvalue = select.value;
		select.innerHTML = "";
		Object.entries(room_list).forEach(([key, value]) => {
			let option = document.createElement("option");
			option.value = key;
			option.text = value;
			if (key == tempselectedvalue) {
				option.selected = true;
			}
			select.appendChild(option);
		});
	});
};
const add_subjects_options_to_myteacher_table = (subject_list) => {
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

// renders the timetable on the main table [ uses the same strucute of JSON as it POST to the backend]
const render_tables = () => {
	// rendering the second table first 
	let localteacher_subject_data = timetable.teacher_subject_data;
	for (let i = 0; i < localteacher_subject_data.length; i++) {
		const element = localteacher_subject_data[i];

		let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
		let newRow = table.insertRow(table.rows.length);

		// subject select box render
		let cell = newRow.insertCell();
		let select = document.createElement('select');
		select.setAttribute('class', 'form-select text');
		cell.appendChild(select);
		// adding blank option
		let option = document.createElement('option');
		option.value = "";
		option.text = "";
		if ("" == localteacher_subject_data[i].subjectcode) {
			option.selected = true;
		}
		select.appendChild(option);
		for (let ele in subjectdata) {
			option = document.createElement('option');
			option.value = subjectdata[ele].subjectcode;
			option.text = subjectdata[ele].subjectname;
			if (subjectdata[ele].subjectcode == localteacher_subject_data[i].subjectcode) {
				option.selected = true;
				// console.log(ele)
			}
			select.appendChild(option);
		}

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

		// rest of the slots are inserted with empty elements and then updated
		for (let i = 2; i < 5; i++) {
			let cell = newRow.insertCell();
			let cell_insert = document.createElement("span");
			cell_insert.setAttribute("class", "text");
			cell.appendChild(cell_insert);
		}
	}
	update_detail_table();
	add_subjects_options_to_myteacher_table(localteacher_subject_data)

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
fetch_room_list();
fetch_faculties_list();
add_subjects_options_to_myteacher_table(subjectdata);
add_rooms_options_to_myteacher_table(room_list);

setTimeout(render_tables, 3000); // promises sekh le 