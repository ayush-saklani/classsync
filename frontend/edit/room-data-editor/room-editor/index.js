let room_list;
let messageCounter = 0;
const delete_room_data = () => {		// deletes the room data from the server
	return new Promise((resolve, reject) => {
		fetch(`${localhost}/room/removeall`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getCookie('accessToken')}`
			}
		}).then(response => response.json())
		.then(() => {
			console.log(':::: Room Data Deleted ::::');
			float_error_card_func('Room Data Deleted', '', 'success');
			resolve();
		})
		.catch(error => {
			float_error_card_func('Room Data not Deleted<br>Server Error', '', 'danger'),
			console.error('Room Data not Deleted [ SERVER ERROR ] :::: ', error)
			reject(error);
		});
	});
};
const save_table_func = () => {				//  function below calculate and construct the room list and send that to the backend via post request 
	return new Promise((resolve, reject) => {
		let res = [];
		let tableBody = document.getElementById("room_table").getElementsByTagName('tbody')[0];
		// Iterate over each row in the table body
		for (let i = 0; i < tableBody.rows.length; i++) {
			let id = tableBody.rows[i].cells[0].firstElementChild.value.trim();
			let name = tableBody.rows[i].cells[1].firstElementChild.value;
			let capacity = tableBody.rows[i].cells[2].firstElementChild.value;
			let type = tableBody.rows[i].cells[3].firstElementChild.value;
			if (id === "" || name === "" && id !== "0") {
				float_error_card_func('Empty Field found', '', 'danger');
				continue; 		
			}
			else if (id in res) {
				float_error_card_func('Duplicate ID found', '', 'danger');
				return;
			}
			else if (id.length > 10) {
				float_error_card_func('ID too long (10 digits Max)', '', 'danger');
				return;
			}
			let schedule, course = [];
			for(element in room_list){
				if(room_list[element].roomid == id){
					course = room_list[element].allowed_course;
					schedule = room_list[element].schedule;
				}
			}
			// console.log(room_list[id]);
			res.push({
				"roomid": id,
				"name": name,
				"capacity": capacity,
				"type": type,
				"allowed_course": course,
				"schedule":  schedule ||
				{
					"mon": {
						"08-09": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"09-10": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"10-11": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"11-12": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"12-01": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"01-02": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"02-03": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"03-04": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"04-05": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"05-06": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""}
					},
					"tue": {
						"08-09": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"09-10": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"10-11": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"11-12": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"12-01": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"01-02": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"02-03": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"03-04": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"04-05": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"05-06": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""}
					},
					"wed": {
						"08-09": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"09-10": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"10-11": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"11-12": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"12-01": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"01-02": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"02-03": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"03-04": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"04-05": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"05-06": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""}
					},
					"thu": {
						"08-09": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"09-10": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"10-11": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"11-12": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"12-01": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"01-02": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"02-03": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"03-04": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"04-05": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"05-06": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""}
					},
					"fri": {
						"08-09": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"09-10": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"10-11": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"11-12": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"12-01": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"01-02": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"02-03": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"03-04": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"04-05": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"05-06": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""}
					},
					"sat": {
						"08-09": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"09-10": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"10-11": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"11-12": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"12-01": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"01-02": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"02-03": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"03-04": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"04-05": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"05-06": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""}
					},
					"sun": {
						"08-09": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"09-10": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"10-11": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"11-12": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"12-01": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"01-02": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"02-03": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"03-04": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"04-05": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""},
						"05-06": {"course":"","semester":"","section":[],"teacherid": "","subjectcode": ""}
					}
				}
			});
		}
		console.log(res);
		fetch(`${localhost}/room/savemultiple`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getCookie('accessToken')}`
			},
			body: JSON.stringify({
				"type": "faculties",
				"data": res
			}),
			credentials: 'include'
		}).then(parsedData => {
			float_error_card_func('Room Data Saved Success', '', 'success');
			console.log(':::::  Room Data Saved Successfully  :::::', parsedData);
			resolve(parsedData);
		}).catch(error => {
			float_error_card_func('Room Data Saving Failed', '', 'danger');
			console.error('::::: Error Saving Data (Server Error) :::::', error);
			reject(error);
		});
	});
};
const render_tables = () => {				// renders the tables
	let table = document.getElementById("room_table").getElementsByTagName('tbody')[0];
	table.innerHTML = "";
	// room_list.sort((a, b) => a.roomid - b.roomid);	
	room_list.sort((a, b) => {
		if (a.roomid === '0') return -1;
		if (b.roomid === '0') return 1;
		return a.name.localeCompare(b.name);
	});
	for( element in room_list){
		let newRow = table.insertRow(table.rows.length);
		let cell = newRow.insertCell();
		let cell_insert = document.createElement("input");
		cell_insert.setAttribute("class", "form-control text text fw-bold");
		cell_insert.setAttribute("type", "text");
		cell_insert.value = room_list[element].roomid;
		if (room_list[element].roomid == "0") {
			cell_insert.disabled = true;
			cell_insert.classList.add("text-danger");
		}
		cell.appendChild(cell_insert);

		cell = newRow.insertCell();
		cell_insert = document.createElement("input");
		cell_insert.setAttribute("class", "form-control text fw-medium");
		cell_insert.setAttribute("type", "text");
		cell_insert.value = room_list[element].name;
		if (room_list[element].roomid == "0") {
			cell_insert.disabled = true;
			cell_insert.classList.add("text-danger");
			cell_insert.classList.add("fw-bold");
			cell_insert.value = "Reserved by Admin";
		}
		cell.appendChild(cell_insert);
		// below code is to check if the room is used or not to avoid deletion of used room (Might be removed in future)
		let flag = 0;
		let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
		let currcol = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"];
		for (let i = 1; i <= 7; i++) {
			let currrow = days[i - 1];
			for (let j = 1; j <= 10; j++) {
				let tempdayslot = currcol[j - 1];                
				if(room_list[element].schedule[currrow][tempdayslot].course){
					flag++;
					break;
				}                       
			}
			if(flag>0){
				break;
			}
		}
		if(flag>0){
			cell_insert.classList.add("bg-warning");
		}
		// above code is to check if the room is used or not to avoid deletion of used room (Might be removed in future)
		
		cell = newRow.insertCell();
		select = document.createElement('select');
		select.setAttribute('class', 'form-select text');
		for(let i = 1; i <= 4; i++){
			let option = document.createElement('option');
			option.value = option.text = i;
			select.appendChild(option);
		}
		select.value = room_list[element].capacity;
		if(room_list[element].roomid == "0"){
			select.disabled = true;
			select.classList.add("text-danger");
			select.classList.add("fw-bold");
			select.value = "1";
		}
		cell.appendChild(select);

		cell = newRow.insertCell();
		select = document.createElement('select');
		select.setAttribute('class', 'form-select text');
		let options = ["class", "hall", "computerlab", "englishlab", "electroniclab", "mechanicallab", "civillab", "drawinglab", "physicslab", "chemistrylab", "ladieswashroom", "gentswashroom", "office", "staffroom", "other"];
		for(let i = 0; i < options.length; i++){
			let option = document.createElement('option');
			option.value = option.text = options[i];
			select.appendChild(option);
		}
		select.value = room_list[element].type;
		if(room_list[element].roomid == "0"){
			select.disabled = true;
			select.classList.add("text-danger");
			select.classList.add("fw-bold");
			select.value = "class";
		}
		cell.appendChild(select);

		cell = newRow.insertCell();
		cell_insert = document.createElement("span");
		cell_insert.setAttribute("class", "form-control text fw-medium");
		cell_insert.innerHTML = (room_list[element].allowed_course).toString();
		if (room_list[element].roomid == "0") {
			cell_insert.classList.add("text-danger");
			cell_insert.classList.add("fw-bold");
			cell_insert.innerHTML = "Reserved by Admin";
		}
		cell.appendChild(cell_insert);
	}
};
const fetch_room_list = () => {		// fetches the room list from the server
	// document.getElementById("loader").style.display = "flex";
	fetch(`${localhost}/room/getall`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json())
	.then(data => {
		data = data.data;
		console.log(data);
		room_list = data;
		console.log(room_list);
		// below code is to remove duplicate rooms (Might be removed in future)
		// for(let i = 0; i < room_list.length; i++){
		// 	for(let j = 0; j < room_list.length; j++){
		// 	if(room_list[i].roomid == room_list[j].roomid && i != j){
		// 		room_list.splice(j, 1);
		// 		console.log("Duplicate Found");
		// 	}
		// }}
	}).then(() => {	
		render_tables();
	}).then(() => {
		document.getElementById("save_room_list").disabled = false;
		setTimeout(() => {
			document.getElementById("loader").style.display = "none";
		}, 2000);
		float_error_card_func('Room Data Fetched Success', '', 'success');
	}).catch(error => {
		document.getElementById("save_room_list").disabled = false;
		setTimeout(() => {
			document.getElementById("loader").style.display = "none"; 
		}, 2000);
		float_error_card_func('Room Data Fetching Failed', '', 'danger');
		console.error(':::: Room Data not available (SERVER ERROR) :::: ', error)
	});
};	
const add_row_func = () => {			//  function creates a row in the table 
	let table = document.getElementById("room_table").getElementsByTagName('tbody')[0];
	let newRow = table.insertRow(table.rows.length);

	let cell = newRow.insertCell();
	let cell_insert = document.createElement("input");
	cell_insert.setAttribute("class", "form-control text text fw-bold");
	cell_insert.setAttribute("type", "text");
	cell.appendChild(cell_insert);
	
	cell = newRow.insertCell();
	cell_insert = document.createElement("input");
	cell_insert.setAttribute("class", "form-control text fw-medium");
	cell_insert.setAttribute("type", "text");
	cell.appendChild(cell_insert);
	
	cell = newRow.insertCell();
	select = document.createElement('select');
	select.setAttribute('class', 'form-select text');
	for(let i = 1; i <= 4; i++){
		let option = document.createElement('option');
		option.value = option.text = i;
		select.appendChild(option);
	}
	cell.appendChild(select);

	cell = newRow.insertCell();
	select = document.createElement('select');
	select.setAttribute('class', 'form-select text');
	let options = ["class", "hall", "computerlab", "englishlab", "electroniclab", "mechanicallab", "civillab", "drawinglab", "physicslab", "chemistrylab", "ladieswashroom", "gentswashroom", "office", "staffroom", "other"];
	for(let i = 0; i < options.length; i++){
		let option = document.createElement('option');
		option.value = option.text = options[i];
		select.appendChild(option);
	}
	cell.appendChild(select);
};
const delete_row_func = () => {			//  function deletes a row in the table 
	let table = document.getElementById("room_table").getElementsByTagName('tbody')[0];
	let rowCount = table.rows.length;
	if (table.rows.length <= 1) {
		float_error_card_func('Cannot Delete Row', '', 'danger');
		return;
	}
	table.deleteRow(rowCount - 1);
}
const delete_room_func = () => {		//  function deletes a room from the table
	// document.getElementById("loader").style.display = "flex";
	fetch(`${localhost}/room/remove?roomid=${document.getElementById("remove_room_id").value}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getCookie('accessToken')}`
		},
	}).then(response => {
		if(response.ok){
			return response.json();
		}else{
			throw new Error('Room Data not deleted', response.status);
		}
	})
	.then(() => {
		document.getElementById("remove_room_button").disabled = false;
		setTimeout(() => {
			document.getElementById("loader").style.display = "none";
		}, 2000);
		float_error_card_func('Room Data Deleted', '', 'success');
		fetch_room_list();
	}).catch(error => {
		document.getElementById("remove_room_button").disabled = false;
		setTimeout(() => {
			document.getElementById("loader").style.display = "none"; 
		}, 2000);
		float_error_card_func('Room Data not Deleted', '', 'danger');
		console.error(':::: Room Data not deleted (SERVER ERROR) :::: ', error)
	});
}
document.addEventListener('DOMContentLoaded', fetch_room_list);
document.getElementById("add_row").addEventListener("click", add_row_func);					// [ + button ] add row at last when plus button is pressed 
document.getElementById("delete_row").addEventListener("click", delete_row_func);			// [ - button ] delete row at last when plus button is pressed 
document.getElementById("remove_room_button").addEventListener("click", delete_room_func);			// [ - button ] delete row at last when plus button is pressed 
document.getElementById("save_room_list").addEventListener("click", async ()=>{
	document.getElementById("loader").style.display = "flex";
	// await delete_room_data();	// not required
	await save_table_func();
	// fetch_room_list();
	document.getElementById("loader").style.display = "none";
});			