let faculty_data;
let messageCounter = 0;

const render_tables = () => {				// renders the tables
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	table.innerHTML = "";
	faculty_data.sort((a, b) => a.teacherid - b.teacherid);	// sorting the data by teacher id
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
		
		
		// below code is to check if the teacher is active or not to avoid deletion of any active teacher (Might be removed in future)

		let flag = 0;
		let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
		let currcol = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"];
		for (let i = 1; i <= 7; i++) {
			let currrow = days[i - 1];
			for (let j = 1; j <= 10; j++) {
				let tempdayslot = currcol[j - 1];                
				if(faculty_data[element].schedule[currrow][tempdayslot].course){
					flag++;
				}                       
				console.log(faculty_data[element].schedule[currrow][tempdayslot]);                       
			}
		}
		if(flag>0){
			cell_insert.classList.add("bg-warning");
		}
		// above code is to check if the teacher is active or not to avoid deletion of any active teacher (Might be removed in future)

		if (faculty_data[element].teacherid == "0") {
			cell_insert.classList.add("text-danger");
			cell_insert.innerHTML = "<b>Reserved by Admin</b>";
		}
	}
};
const fetch_faculties_list = () => {		// fetches the faculty list from the server
	// document.getElementById("loader").style.display = "flex";
	console.log
	fetch(`${localhost}/faculty/getall`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getCookie('accessToken')}`
		}
	})
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw new Error('Faculty Data not available [ SERVER ERROR ] ::::', response.status);
			}
		})
		.then(data => {
			data = data.data;
			console.log(data);
			faculty_data = data;
		})
		.then(() => {
			render_tables();
		})
		.then(() => {
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
			}, 2000);
			// document.getElementById("save_teacher_list_btn").disabled = false;
			float_error_card_func('Faculty Data Fetched Successfully', '', 'success');
		})
		.catch(error => {
			setTimeout(() => {
				document.getElementById("loader").style.display = "none"; 
			}, 2000);
			float_error_card_func('Faculty Data not available', '', 'danger');
			console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error)
		});
};	
const addfaculty = () => {					// function to add faculty	
	document.getElementById("add_faculty_button").disabled = true;
	let id = document.getElementById("add_faculty_id").value;
	let name = document.getElementById("add_faculty_name").value;
	id = id.trim();
	name = name.trim();
	if(id==="0"){
		float_error_card_func('Reserved ID Error', 'ID 0 is reserved for Admin <br> please dont do that', 'warning');
		document.getElementById("add_faculty_button").disabled = false;
		return;
	}
	if (id === "" || name === "") {
		float_error_card_func('Empty Field Error', 'Please fill all the fields before saving the data ( ID and Name are required )', 'warning');
		document.getElementById("add_faculty_button").disabled = false;
		return;
	}
	fetch(`${localhost}/faculty/add?teacherid=` + id + '&name=' + name, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getCookie('accessToken')}`
		}
	})
		.then(response => {
			if (response.status === 403) {
				// float_error_card_func('Faculty not added', 'Faculty not added due to duplicate ID', 'danger');
				throw new Error('Faculty not added <br>This ID already exists please use a different ID');
			}
			return response.json();
		})
		.then((parsedData) => {
			document.getElementById("add_faculty_button").disabled = false;
			float_error_card_func('Faculty Added Successfully', `<b>Name: ${name} and ID: ${id}</b>`, 'success');
			console.log(':::::  TEACHER DATA ADDED SUCCESSFULLY  :::::', parsedData);
		})
		.then(() => {
			fetch_faculties_list();
		})
		.catch(error => {
			document.getElementById("add_faculty_button").disabled = false;
			float_error_card_func('Faculty not added', error||'Faculty not removed due to inavailability or probable server error', 'danger');
			console.error('::::: ERROR ADDING DATA :::::', error);
		});
};
const updatefaculty = () => {					// function to add faculty	
	document.getElementById("update_faculty_button").disabled = true;
	let id = document.getElementById("update_faculty_id").value;
	let name = document.getElementById("update_faculty_name").value;
	id = id.trim();
	name = name.trim();
	if(id==="0"){
		float_error_card_func('Reserved ID Error', 'ID 0 is reserved for Admin <br> please dont do that', 'warning');
		document.getElementById("update_faculty_button").disabled = false;
		return;
	}
	if (id === "" || name === "") {
		float_error_card_func('Empty Field Error', 'Please fill all the fields before saving the data ( ID and Name are required )', 'warning');
		document.getElementById("update_faculty_button").disabled = false;
		return;
	}
	
	fetch(`${localhost}/faculty/remove?teacherid=` + id,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getCookie('accessToken')}`
		}
	}).then(response => {
		if(response.ok){
			return response.json();
		}
		else{
			throw new Error('Faculty Data not available [ SERVER ERROR ] ::::', response.status);
		}
	}).then(parsedData => {
		// float_error_card_func('Faculty Removed Successfully', `Faculty Removed Successfully <br><b>ID:${id}</b> deleted`, 'success');
		console.log(':::::  TEACHER DATA REMOVED SUCCESSFULLY  :::::', parsedData);
	}).then(() => {
		fetch(`${localhost}/faculty/add?teacherid=` + id + '&name=' + name, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getCookie('accessToken')}`
			}
		}).then(response => {
			if (response.status === 403) {
				throw new Error('Faculty not added <br>This ID already exists please use a different ID');
			}
			return response.json();
		}).then((parsedData) => {
			document.getElementById("update_faculty_button").disabled = false;
			// float_error_card_func('Faculty Added Successfully', `Faculty Name: ${name} and ID: ${id} Added`, 'success');
			console.log(':::::  TEACHER DATA ADDED SUCCESSFULLY  :::::', parsedData);
		}).catch(error => {
			document.getElementById("update_faculty_button").disabled = false;
			float_error_card_func('Faculty not added<br>', error||'Faculty not removed <br> Server Error', 'danger');
			console.error('::::: ERROR ADDING DATA :::::', error);
		});
	}).then(() => {
		float_error_card_func('Faculty data updated', '', 'success');
		fetch_faculties_list();
	}).catch(error => {
		document.getElementById("update_faculty_button").disabled = false;
		float_error_card_func('Faculty not updated<br>', error||'Faculty not updated <br> Server Error', 'danger');
		console.error('::::: ERROR REMOVING DATA :::::', error);
	});
};
const removefaculty = () => {				// function to remove faculty
	document.getElementById("add_faculty_button").disabled = true
	let id = document.getElementById("remove_faculty_id").value;
	id = id.trim();
	if(id==="0"){
		float_error_card_func('Reserved ID Error', 'ID 0 is reserved for Admin <br> please dont do that', 'warning');
		return;
	}
	if (id === "") {
		float_error_card_func('Empty Field Error', 'Please fill all the fields before saving the data ( ID and Name are required )', 'warning');
		return;
	}
	fetch(`${localhost}/faculty/remove?teacherid=` + id,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getCookie('accessToken')}`
		}
	})
		.then(response => response.json())
		.then(parsedData => {
			document.getElementById("add_faculty_button").disabled = false;
			float_error_card_func('Faculty Removed Successfully', `<b>ID: ${id}</b> deleted`, 'success');
			console.log(':::::  TEACHER DATA REMOVED SUCCESSFULLY  :::::', parsedData);
		})
		.then(() => {
			fetch_faculties_list();
		})
		.catch(error => {
			document.getElementById("add_faculty_button").disabled = false;
			float_error_card_func('Faculty not removed', 'Server error', 'danger');
			console.error('::::: ERROR REMOVING DATA :::::', error);
		});
};
document.addEventListener('DOMContentLoaded', fetch_faculties_list);
document.getElementById("add_faculty_button").addEventListener("click", addfaculty);
document.getElementById("remove_faculty_button").addEventListener("click", removefaculty);
document.getElementById("update_faculty_button").addEventListener("click", updatefaculty);