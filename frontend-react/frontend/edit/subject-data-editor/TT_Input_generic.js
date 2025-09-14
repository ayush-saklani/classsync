// Sample data for generating dropdowns will be fetched from apis and database
let timetable ;
let messageCounter = 0;
const add_row_func = () => {			//  function creates a row in the table 
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

	cell = newRow.insertCell();
	select = document.createElement('select');
	select.setAttribute('class', 'form-select text');
	cell.appendChild(select);
	let options = ["class", "computerlab", "englishlab", "electroniclab", "mechanicallab", "civillab", "drawinglab", "physicslab", "chemistrylab", "other"];
	for (let i = 0; i < options.length; i++) {
		let option = document.createElement('option');
		option.value = option.text = options[i];
		select.appendChild(option);
	}
	cell = newRow.insertCell();
};
const delete_row_func = () => {			//  function deletes a row in the table 
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	let rowCount = table.rows.length;
	table.deleteRow(rowCount - 1);
}
const save_table_func = () => {			//  calculate and construct the subject table json and send that to the backend 
	let tempteachersubjectdata = [];

	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	// Iterate over each row in the table body
	for (let i = 0; i < tableBody.rows.length; i++) {
		let row = tableBody.rows[i];

		let subjectname = row.cells[0].firstChild.value;
		subjectname = subjectname.trim();
		let subjectid = row.cells[1].firstChild.value;
		subjectid = subjectid.trim();
		let weekly_hrs = row.cells[2].firstChild.value;
		let theory_practical = row.cells[3].firstChild.value;
		let room_type = row.cells[4].firstChild.value;
		let teacherid = "";
		let teachername = "";
		if(subjectid === "" || subjectname === ""){
			setTimeout(() => {
				float_error_card_func('Empty Field encountered', 'Row with empty fields will be skipped during data saving <br>Complete the field and save again or you might lose the data', 'warning');
			}, 2000);
			continue;
		}

		let rowData = {
			"subjectcode": subjectid,
			"teacherid": teacherid,
			"weekly_hrs": weekly_hrs,
			"teachername": teachername,
			"subjectname": subjectname,
			"theory_practical": theory_practical,
			"room_type": room_type,
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
	fetch(`${localhost}/subjecttable/save`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('accessToken')}`
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
			float_error_card_func('Data Sent and Saved Successfully', 'Common subject Data Saved to Database Successfully', 'success');
			// console.log(':::::  DATA SAVED SUCCESSFULLY  :::::', parsedData);
			
		}).catch(error => {
			float_error_card_func('Data not saved', 'Data not saved to Database to probable server error ', 'danger');
			console.error('::::: ERROR SAVING DATA :::::', error);
		});
};
const render_tables = () => {			//	renders the tables
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	table.innerHTML = "";
	if (timetable) {
		let localteacher_subject_data = timetable.teacher_subject_data;
		localteacher_subject_data.sort((a, b) => b.theory_practical.localeCompare(a.theory_practical)); // sort the data based on subject code
		for (let i = 0; i < localteacher_subject_data.length; i++) {
			const element = localteacher_subject_data[i];

			let newRow = table.insertRow(table.rows.length);

			let cell = newRow.insertCell();
			let cell_insert = document.createElement("input");
			cell_insert.setAttribute("class", "form-control text");
			cell_insert.setAttribute("type", "text");
			cell_insert.value = localteacher_subject_data[i].subjectname.toUpperCase();
			cell.appendChild(cell_insert);

			cell = newRow.insertCell();
			cell_insert = document.createElement("input");
			cell_insert.setAttribute("class", "form-control text");
			cell_insert.setAttribute("type", "text");
			cell_insert.value = localteacher_subject_data[i].subjectcode.toUpperCase();
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
			let option_option = ["THEORY", "PRACTICAL"];
			for (let j = 0; j < option_option.length; j++) {
				let option = document.createElement('option');
				option.value = option.text = option_option[j];
				option.classList.add('fw-bold');
				select.appendChild(option);
			}
			if (localteacher_subject_data[i].theory_practical === "PRACTICAL") {
			   	select.value = localteacher_subject_data[i].theory_practical;
			    // select.classList.add('bg-practical', 'text-light','fw-bold','border','border-practical'); 	// Make dropdown colored with light text
			}
			else if (localteacher_subject_data[i].theory_practical === "THEORY") {
				select.value = localteacher_subject_data[i].theory_practical;
				// select.classList.add('bg-theory', 'text-light','fw-bold','border','border-theory'); 		// Make dropdown colored with light text
			}

			// below code is for making the colored marker cell for denoting theory and practical
			// (might delete this code)(if delete remove the comment of above select code)
			cell = newRow.insertCell();
			select = document.createElement('select');
			select.setAttribute('class', 'form-select text');
			cell.appendChild(select);
			
			let options = ["class", "computerlab", "englishlab", "electroniclab", "mechanicallab", "civillab", "drawinglab", "physicslab", "chemistrylab", "other"];
			for (let j = 0; j < options.length; j++) {
				let option = document.createElement('option');
				option.value = option.text = options[j];
				select.appendChild(option);
			}
			if(localteacher_subject_data[i].room_type){
				select.value = localteacher_subject_data[i].room_type;
			}else{
				select.value = 'class';
			}
			
			cell = newRow.insertCell();
			cell.setAttribute('style', 'height: 40px;');
			cell.setAttribute('style', 'width: 40px;');
			if (localteacher_subject_data[i].theory_practical === "PRACTICAL") {
				cell.classList.add('text-center','bg-practical','border','border-practical') ;
			}
			else if (localteacher_subject_data[i].theory_practical === "THEORY") {
				cell.classList.add('text-center','bg-theory','border','border-theory') ;
		 	}
		}
		document.getElementById("save_subject_list").disabled = false;
	}
}
const fetch_course_data = () => {		// fetches the course data from the server
	document.getElementById("save_subject_list").disabled = true;
	document.getElementById("set_for_all").disabled = true;
	// document.getElementById("loader").style.display = "flex"; // dekh lena baad mei 
	let course_option = document.getElementById("course_option").value;
	let semester_option = document.getElementById("semester_option").value;
	console.log(course_option, semester_option);
	fetch(`${localhost}/subjecttable/get?course=${course_option}&semester=${semester_option}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			data = data.data;
			timetable = data;
			console.log(data);
			render_tables();
		})
		.then(() => {
			document.getElementById("save_subject_list").disabled = false;
			document.getElementById("set_for_all").disabled = false;
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
			}, 2000);
			if(!timetable){
				throw new Error('Data not available due to probable server error or Data doesnt exists in the Database');
			}
			else{
				float_error_card_func('Data Fetched Successfully', 'Data Fetched Successfully from the Database', 'success');
			}
		})
		.catch(error => {
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
			}, 2000);
			document.getElementById("save_subject_list").disabled = false;
			document.getElementById("set_for_all").disabled = false;
			float_error_card_func('Data not available', 'Data not available due to probable server error or Data doesnt exists in the Database', 'danger');
			console.error('::::: ERROR FETCHING DATA :::::', error);
		});
}
const set_for_all = () => {			// reset the data for all the courses and semesters
	document.getElementById("save_subject_list").disabled = true;
	document.getElementById("set_for_all").disabled = true;
	// document.getElementById("loader").style.display = "flex"; // dekh lena baad mei 
	let course_option = document.getElementById("course_option").value;
	let semester_option = document.getElementById("semester_option").value;
	fetch(`${localhost}/subjecttable/update?course=${course_option}&semester=${semester_option}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getCookie('accessToken')}`
		}
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(':::::  DATA NOT SAVED DUE TO NETWORK ERROR :::::');
			}
		})
		.then(() => {
			document.getElementById("save_subject_list").disabled = false;
			document.getElementById("set_for_all").disabled = false;
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
			}, 2000);
			float_error_card_func('Data Set for all Successfully', 'Data Set for all Successfully Done for all the courses and semesters', 'success');
		})
		.catch(error => {
			document.getElementById("save_subject_list").disabled = false;
			document.getElementById("set_for_all").disabled = false;
			setTimeout(() => {
				document.getElementById("loader").style.display = "none";
			}, 2000);
			float_error_card_func('Data Set for all Failed', 'Data not Set for all due to probable server error or Data doesnt exists in the Database', 'danger');
			console.error('::::: ERROR RESETTING DATA :::::', error);
		});
}
document.addEventListener("DOMContentLoaded", ()=>{
	document.getElementById('semester_option').value = '3';
	fetch_course_data();
});
document.getElementById("save_subject_list").addEventListener("click", save_table_func);	// [ save subject list button ]
document.getElementById("set_for_all").addEventListener("click", ()=>{						// [ set for all button ]
	let confirmation = confirm(`Are you really sure that you want to set the data for all sections ?`);
	let confirmation2 = confirm(`course : ${document.getElementById("course_option").value} \nsemester : ${document.getElementById("semester_option").value}`);
	let confirmation3 = confirm(`This action cannot be undone. save the data before proceeding.`);
	if(confirmation && confirmation2 && confirmation3){
		set_for_all();
	}
});	
document.getElementById("add_row").addEventListener("click", add_row_func);					// [ + button ] add row at last when plus button is pressed 
document.getElementById("delete_row").addEventListener("click", delete_row_func);			// [ - button ] delete row at last when plus button is pressed 
document.getElementById("course_option").addEventListener("change", fetch_course_data);		// [ course dropdown ] fetch data on course change
document.getElementById("semester_option").addEventListener("change", fetch_course_data);	// [ semester dropdown ] fetch data on semester change	