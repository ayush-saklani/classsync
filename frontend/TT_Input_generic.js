// Sample data for generating dropdowns will be fetched from apis and database
let timetable = {
	"course": "btechcse",
	"semester": "6",
	"teacher_subject_data": [
		{
			"subjectcode": "TCS601",
			"teacherid": "2",
			"weekly_hrs": "3",
			"teachername": "DR DEVESH P SINGH",
			"subjectname": "COMPILER DESIGN",
			"theory_practical": "THEORY"
		},
		{
			"subjectcode": "PXCS601",
			"teacherid": "21011355",
			"weekly_hrs": "2",
			"teachername": "MS NEELAM",
			"subjectname": "CAREER SKILLS LAB",
			"theory_practical": "PRACTICAL"
		},
		{
			"subjectcode": "XCS601Q",
			"teacherid": "10",
			"weekly_hrs": "2",
			"teachername": "MR PA ANAND",
			"subjectname": "CAREER SKILLS QUANT",
			"theory_practical": "THEORY"
		},
		{
			"subjectcode": "TCS604",
			"teacherid": "3",
			"weekly_hrs": "3",
			"teachername": "DR SATVIK VATS",
			"subjectname": "COMPUTER NETWORKS I",
			"theory_practical": "THEORY"
		}
	]
}
//  these functions creates a row on table 
const add_row_func = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	let newRow = table.insertRow(table.rows.length);

	let cell = newRow.insertCell();
	let cell_insert = document.createElement("input");
	cell_insert.setAttribute("class", "form-control");
	cell_insert.setAttribute("type", "text");
	cell.appendChild(cell_insert);

	cell = newRow.insertCell();
	cell_insert = document.createElement("input");
	cell_insert.setAttribute("class", "form-control");
	cell_insert.setAttribute("type", "text");
	cell.appendChild(cell_insert);

	cell = newRow.insertCell();
	select = document.createElement('select');
	select.setAttribute('class', 'form-select text');
	cell.appendChild(select);
	for (let i = 0; i <= 6; i++) {
		let option = document.createElement('option');
		option.value = option.text = i;
		if (i == 3) {
			option.selected = true;
		}
		select.appendChild(option);
	}

	cell = newRow.insertCell();
	select = document.createElement('select');
	select.setAttribute('class', 'form-select text');
	cell.appendChild(select);
	let option = document.createElement('option');
	option.value = option.text = "THEORY";
	select.appendChild(option);
	option = document.createElement('option');
	option.value = option.text = "PRACTICAL";
	select.appendChild(option);
};
//  these functions deletes a row on table 
const delete_row_func = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	let rowCount = table.rows.length;
	table.deleteRow(rowCount - 1);
}
//  function below calculate and construct the subject table json 
// and send that to the backend via post request 
// 	============================	[ post request pending ]	============================ 
const save_table_func = () => {
	let tempteachersubjectdata = [];

	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	// Iterate over each row in the table body
	for (let i = 0; i < tableBody.rows.length; i++) {
		let row = tableBody.rows[i];

		let subjectname = row.cells[0].firstChild.value;
		let subjectid = row.cells[1].firstChild.value;
		let weekly_hrs = row.cells[2].firstChild.value;
		let theory_practical = row.cells[3].firstChild.value;
		let teacherid = "";
		let teachername = "";

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
		"teacher_subject_data": tempteachersubjectdata,
	};

	const jsonDataString = JSON.stringify(jsonData, null, 4);
	console.log(jsonDataString);

	// Create a POST request
	fetch('http://127.0.0.1:3000/save-section-data-tester', {
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

// renders the tables
const render_tables = () => {
	let localteacher_subject_data = timetable.teacher_subject_data;
	for (let i = 0; i < localteacher_subject_data.length; i++) {
		const element = localteacher_subject_data[i];

		let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
		let newRow = table.insertRow(table.rows.length);

		let cell = newRow.insertCell();
		let cell_insert = document.createElement("input");
		cell_insert.setAttribute("class", "form-control");
		cell_insert.setAttribute("type", "text");
		cell_insert.value = localteacher_subject_data[i].subjectname;
		cell.appendChild(cell_insert);

		cell = newRow.insertCell();
		cell_insert = document.createElement("input");
		cell_insert.setAttribute("class", "form-control");
		cell_insert.setAttribute("type", "text");
		cell_insert.value = localteacher_subject_data[i].subjectcode;
		cell.appendChild(cell_insert);

		cell = newRow.insertCell();
		select = document.createElement('select');
		select.setAttribute('class', 'form-select text');
		cell.appendChild(select);
		for (let j = 0; j <= 6; j++) {
			let option = document.createElement('option');
			option.value = option.text = j;
			select.appendChild(option);
			if (j === eval(localteacher_subject_data[i].weekly_hrs)) {
				option.selected = true;
			}
		}

		cell = newRow.insertCell();
		select = document.createElement('select');
		select.setAttribute('class', 'form-select text');
		cell.appendChild(select);
		if (localteacher_subject_data[i].theory_practical === "PRACTICAL") {
			let option = document.createElement('option');
			option.value = localteacher_subject_data[i].theory_practical;
			option.text = localteacher_subject_data[i].theory_practical;
			option.selected = true;
			select.appendChild(option);
			option = document.createElement('option');
			option.value = "THEORY";
			option.text = "THEORY";
			select.appendChild(option);
		}
		else if (localteacher_subject_data[i].theory_practical === "THEORY") {
			let option = document.createElement('option');
			option.value = localteacher_subject_data[i].theory_practical;
			option.text = localteacher_subject_data[i].theory_practical;
			option.selected = true;
			select.appendChild(option);
			option = document.createElement('option');
			option.value = "PRACTICAL";
			option.text = "PRACTICAL";
			select.appendChild(option);
		}
	}
}
setTimeout(render_tables, 3000); // promises sekh le 
document.getElementById("set_for_all").addEventListener("click", save_table_func);	// [ save TT JSON on DB button ]
document.getElementById("add_row").addEventListener("click", add_row_func);	// [ + button ] add row at last when plus button is pressed 
document.getElementById("delete_row").addEventListener("click", delete_row_func);	// [ - button ] delete row at last when plus button is pressed 