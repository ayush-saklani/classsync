let faculty_data;
//  these functions creates a row on table 
const add_row_func = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	let newRow = table.insertRow(table.rows.length);

	let cell = newRow.insertCell();
	let cell_insert = document.createElement("input");
	cell_insert.setAttribute("class", "form-control room_textinput text fw-bold");
	cell_insert.setAttribute("type", "text");
	cell.appendChild(cell_insert);

	cell = newRow.insertCell();
	cell_insert = document.createElement("input");
	cell_insert.setAttribute("class", "form-control room_textinput text fw-medium");
	cell_insert.setAttribute("type", "text");
	cell.appendChild(cell_insert);

};
//  these functions deletes a row on table 
const delete_row_func = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	let rowCount = table.rows.length;
	table.deleteRow(rowCount - 1);
};
//  function below calculate and construct the teacher list and send that to the backend via post request 
const save_table_func = () => {
	let res = {}
	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	// Iterate over each row in the table body
	for (let i = 0; i < tableBody.rows.length; i++) {
		let id = tableBody.rows[i].cells[0].firstElementChild.value.trim();
		let name = tableBody.rows[i].cells[1].firstElementChild.value;
		res[id] = name;
	}
	console.log(res);
	fetch('http://127.0.0.1:3000/list/save-list', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"type": "rooms",
			"data": res
		})
	})
	.then(parsedData => {
		console.log(':::::  TEACHER DATA SAVED SUCCESSFULLY  :::::', parsedData);
	})
	.catch(error => {
		console.error('::::: ERROR SAVING DATA :::::', error);
	});
};
// renders the tables
const render_tables = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];

	Object.entries(faculty_data).forEach(([key, value]) => {
		let newRow = table.insertRow(table.rows.length);
		let cell = newRow.insertCell();
		let cell_insert = document.createElement("input");
		cell_insert.setAttribute("class", "form-control room_textinput text fw-bold");
		cell_insert.setAttribute("type", "text");
		cell_insert.value = key;
		cell.appendChild(cell_insert);
		if (key == "0") {
			cell_insert.disabled = true;
		}
		cell = newRow.insertCell();
		cell_insert = document.createElement("input");
		cell_insert.setAttribute("class", "form-control room_textinput text fw-medium");
		cell_insert.setAttribute("type", "text");
		cell_insert.value = value;
		cell.appendChild(cell_insert);
		if (key == "0") {
			cell_insert.disabled = true;
		}
	});
};
// fetches the faculty list from the server
const fetch_faculties_list = () => {
	fetch('http://127.0.0.1:3000/list/get-list?type=faculties', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			data = data.data.data;
			faculty_data = data;
			console.log(faculty_data)
		})
		.then(() => {
			render_tables();
		})
		.then(() => {
			document.getElementById("save_teacher_list_btn").disabled = false;
		})
		.catch(error => console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error));
};
fetch_faculties_list();

document.getElementById("add_row").addEventListener("click", add_row_func);	// [ + button ] add row at last when plus button is pressed 
document.getElementById("delete_row").addEventListener("click", delete_row_func);	// [ - button ] delete row at last when plus button is pressed 
document.getElementById("save_teacher_list_btn").addEventListener("click",save_table_func);	