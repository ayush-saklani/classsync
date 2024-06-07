let faculty_data;
let messageCounter = 0;
//  these functions creates a floating error and success card on the screen with the given title, description and color
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
	if (rowCount <= 1) {
		float_error_card_func('Cannot delete row', `This Id and Name are required for the system to work properly. '0' id is reserved.`, 'danger');
		return;
	}
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
		if (id === "" || name === "" && id !== "0") {
			float_error_card_func('Empty Field found', 'Please fill all the fields before saving the data', 'danger');
			return;
		}
		else if (id in res) {
			float_error_card_func('Duplicate ID found', 'ID cannot be duplicate 2 teacher with same IDs are detected', 'danger');
			return;
		}
		else if (id.length > 10) {
			float_error_card_func('ID too long', 'ID cannot be more than 10 digits', 'danger');
			return;
		}
		res[id] = name;
	}
	console.log(res);
	fetch('http://127.0.0.1:3000/list/save-list', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"type": "faculties",
			"data": res
		})
	})
	.then(parsedData => {
		float_error_card_func('Faculty Data Saved Successfully', 'Faculty Data Sent and Saved Successfully to the Database', 'success');
		console.log(':::::  TEACHER DATA SAVED SUCCESSFULLY  :::::', parsedData);
	})
	.catch(error => {
		float_error_card_func('Faculty Data not saved', 'Faculty Data sent but not saved due to probable server error', 'danger');
		console.error('::::: ERROR SAVING DATA :::::', error);
	});
};
// renders the tables
const render_tables = () => {
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];

	for( element in faculty_data){
		let newRow = table.insertRow(table.rows.length);
		let cell = newRow.insertCell();
		let cell_insert = document.createElement("span");
		cell_insert.setAttribute("class", "form-control room_textinput text fw-bold");
		cell_insert.setAttribute("type", "text");
		cell_insert.innerHTML = faculty_data[element].teacherid;
		cell.appendChild(cell_insert);
		if (faculty_data[element].teacherid == "0") {
			cell_insert.classList.add("text-danger");
		}
		cell = newRow.insertCell();
		cell_insert = document.createElement("span");
		cell_insert.setAttribute("class", "form-control room_textinput text fw-medium");
		cell_insert.setAttribute("type", "text");
		cell_insert.innerHTML = faculty_data[element].name;
		cell.appendChild(cell_insert);
		if (faculty_data[element].teacherid == "0") {
			cell_insert.classList.add("text-danger");
			cell_insert.innerHTML = "<b>Reserved by Admin</b>";
		}
	}
};
// fetches the faculty list from the server
const fetch_faculties_list = () => {
	document.getElementById("loader").style.display = "flex";
	fetch('http://127.0.0.1:3000/faculty/getall', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			data = data.data;
			console.log(data);
			// data = data.data.data;
			faculty_data = data;
			// console.log(faculty_data)
		})
		.then(() => {
			render_tables();
		})
		.then(() => {
			document.getElementById("loader").style.display = "none";
			setTimeout(() => {
			}, 2000);
			// document.getElementById("save_teacher_list_btn").disabled = false;
			float_error_card_func('Faculty Data Fetched Successfully', 'Faculty Data Fetched Successfully from the Database', 'success');
		})
		.catch(error => {
			document.getElementById("loader").style.display = "none"; // dekh lena baad mei
			setTimeout(() => {
			}, 2000);
			float_error_card_func('Faculty Data not available', 'Faculty Data not available due to probable server error', 'danger');
			console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error)
		});
};
document.getElementById("loader").style.display = "none";
document.addEventListener('DOMContentLoaded', fetch_faculties_list);

// document.getElementById("add_row").addEventListener("click", add_row_func);	// [ + button ] add row at last when plus button is pressed 
// document.getElementById("delete_row").addEventListener("click", delete_row_func);	// [ - button ] delete row at last when plus button is pressed 
// document.getElementById("save_teacher_list_btn").addEventListener("click",save_table_func);	
const removefaculty = () => {
	let id = document.getElementById("remove_faculty_id").value;
	id = id.trim();
	if (id === "") {
		float_error_card_func('Empty Field Error', 'Please fill all the fields before saving the data ( ID and Name are required )', 'warning');
		return;
	}
	fetch('http://localhost:3000/faculty/remove', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"teacherid": id
		})
	})
		.then(response => response.json())
		.then(parsedData => {
			float_error_card_func('Faculty Removed Successfully', 'Faculty Removed Successfully from the Database', 'success');
			console.log(':::::  TEACHER DATA REMOVED SUCCESSFULLY  :::::', parsedData);
		})
		.catch(error => {
			float_error_card_func('Faculty not removed', 'Faculty not removed due to inavailability or probable server error', 'danger');
			console.error('::::: ERROR REMOVING DATA :::::', error);
		});
}
const addfaculty = () => {
	let id = document.getElementById("add_faculty_id").value;
	let name = document.getElementById("add_faculty_name").value;
	id = id.trim();
	name = name.trim();
	if(id==="0"){
		float_error_card_func('Reserved ID Error', 'ID 0 is reserved for Admin <br> please dont do that', 'warning');
		return;
	}
	if (id === "" || name === "") {
		float_error_card_func('Empty Field Error', 'Please fill all the fields before saving the data ( ID and Name are required )', 'warning');
		return;
	}
	fetch('http://localhost:3000/faculty/add?teacherid=' + id + '&name=' + name, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then((parsedData) => {
			setTimeout(() => {
				float_error_card_func('Faculty Added Successfully', `Faculty Name: ${name} and ID: ${id} Added Successfully to the Database`, 'success');
			}, 2000);
			console.log(':::::  TEACHER DATA ADDED SUCCESSFULLY  :::::', parsedData);
		})
		.catch(error => {
			float_error_card_func('Faculty not added', 'Faculty not removed due to inavailability or probable server error', 'danger');
			console.error('::::: ERROR ADDING DATA :::::', error);
		});
}
document.getElementById("add_faculty_button").addEventListener("click", addfaculty);
document.getElementById("remove_faculty_button").addEventListener("click", removefaculty);