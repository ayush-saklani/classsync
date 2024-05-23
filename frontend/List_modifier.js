let faculty_data;
let messageCounter = 0;
//  these functions creates a floating error and success card on the screen with the given title, description and color
const float_error_card_func = (title, desc, color) => {
	const uniqueId = `float_error_card_${messageCounter++}`;

	let div = document.createElement('div');
	div.className = `card text-bg-${color} position-fixed bottom-0 end-0 m-3`;
	div.style.maxWidth = "25rem";
	div.id = uniqueId;

	let headerDiv = document.createElement('div');
	headerDiv.className = "card-header fw-bold";
	div.appendChild(headerDiv);

	let bodyDiv = document.createElement('div');
	bodyDiv.className = "card-body";

	let h5 = document.createElement('h5');
	h5.className = "card-title";
	h5.textContent = title;
	bodyDiv.appendChild(h5);

	let p = document.createElement('p');
	p.className = "card-text";
	p.textContent = desc;
	bodyDiv.appendChild(p);

	div.appendChild(bodyDiv);
	document.getElementById('message_container').appendChild(div);

	if (color === "success") {
		headerDiv.innerHTML = `Success <i class="bi bi-check-circle-fill"></i>`;
	} else if (color === "danger") {
		headerDiv.innerHTML = `Warning <i class="bi bi-exclamation-triangle-fill"></i>`;
	}
	div.classList.add('rise');
	setTimeout(() => {
		div.classList.remove('rise');
		div.classList.add('sink');
		setTimeout(() => {
			div.remove();
		}, 1000);
	}, 5000);
}
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
			"type": "faculties",
			"data": res
		})
	})
	.then(parsedData => {
		float_error_card_func('Faculty Data Saved Successfully', 'Faculty Data Saved Successfully to the Database', 'success');
		console.log(':::::  TEACHER DATA SAVED SUCCESSFULLY  :::::', parsedData);
	})
	.catch(error => {
		float_error_card_func('Faculty Data not saved', 'Faculty Data not saved due to probable server error', 'danger');
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
			float_error_card_func('Faculty Data Fetched Successfully', 'Faculty Data Fetched Successfully from the Database', 'success');
		})
		.catch(error => {
			float_error_card_func('Faculty Data not available', 'Faculty Data not available due to probable server error', 'danger');
			console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error)
		});
};
document.addEventListener('DOMContentLoaded', fetch_faculties_list);

document.getElementById("add_row").addEventListener("click", add_row_func);	// [ + button ] add row at last when plus button is pressed 
document.getElementById("delete_row").addEventListener("click", delete_row_func);	// [ - button ] delete row at last when plus button is pressed 
document.getElementById("save_teacher_list_btn").addEventListener("click",save_table_func);	