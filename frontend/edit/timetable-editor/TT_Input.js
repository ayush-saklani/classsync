// Sample data for generating dropdowns will be fetched from apis and database
let faculty_data;
let subjectdata;
let room_list;
let timetable;
let local_faculty_data;
let messageCounter = 0;
const fixtime_firstphase = () => {                        	//  this function removes all the classes and decrease the counter(section.length) from the timetable data saved during initialization
	return new Promise((resolve, reject) => {
		try {
			let mytable = document.getElementById("mytable");
			for (let i = 1; i <= 7; i++) {
				let currday = mytable.rows[i].cells[0].innerHTML.toLowerCase();
				for (let j = 1; j <= 10; j++) {
					let currslot = mytable.rows[0].cells[j].innerHTML.toLowerCase();

					let temp_roomid = timetable.schedule[currday][currslot].class_id;
					for (element in room_list) {
						if (room_list[element].roomid == temp_roomid && temp_roomid != '0') {
							let temproom = room_list[element].schedule[currday][currslot];
							// temproom.section = temproom.section.filter((item, index) => temproom.section.indexOf(item) === index);	// remove duplicates from the array ( for debugging )
							if (temproom.section.length > 0) {
								if (temproom.section.length == 1) {
									temproom.course = "";
									temproom.semester = "";
									temproom.subjectcode = "";
									temproom.teacherid = "";
									temproom.section = [];
								}
								else if (temproom.section.length > 1) {
									temproom.section = temproom.section.filter(section => section !== document.getElementById("section_option").value);
								}
							}
							else {
								temproom.course = "";
								temproom.semester = "";
								temproom.subjectcode = "";
								temproom.teacherid = "";
								temproom.section = [];
							}
						}
					}


					// let temp_subject = document.getElementById("mytable").rows[i].cells[j].childNodes[0].value;
					let temp_subject = timetable.schedule[currday][currslot].subjectcode;
					if (temp_subject != '' && temp_roomid != '0') {
						let temp_facultyid_real = timetable.teacher_subject_data.find(x => x.subjectcode === temp_subject).teacherid;
						for (temp_facultyid in faculty_data) {
							if (temp_facultyid_real == faculty_data[temp_facultyid].teacherid) {
								// console.log(faculty_data[temp_facultyid])
								let temp_faculty = faculty_data[temp_facultyid].schedule[currday][currslot];
								if (temp_faculty.section.length > 0) {
									if (temp_faculty.section.length == 1) {
										temp_faculty.section = [];
										temp_faculty.subjectcode = "";
										temp_faculty.course = "";
										temp_faculty.semester = "";
										temp_faculty.roomid = [];
									}
									else if (temp_faculty.section.length > 1) {
										faculty_data[temp_facultyid].schedule[currday][currslot].section = faculty_data[temp_facultyid].schedule[currday][currslot].section.filter(section => section !== document.getElementById("section_option").value);
									}
								}
								else if (temp_faculty.section.length == 0) {
									temp_faculty.section = [];
									temp_faculty.subjectcode = "";
									temp_faculty.course = "";
									temp_faculty.semester = "";
									temp_faculty.roomid = [];
								}
							}
						}
					}
				}
			}
			resolve();
		} catch (error) {
			console.error(':::::  ERROR IN FIXTIME FIRST PHASE :::::', error);
			reject(error);
		}
	});
}
const fixtime_secondphase = () => {                       	//  this function adds all the current selected classes ( mytable ) and increase the counter(section.length)  
	return new Promise((resolve, reject) => {
		try {
			let mytable = document.getElementById("mytable");
			for (let i = 1; i <= 7; i++) {
				let currday = mytable.rows[i].cells[0].innerHTML.toLowerCase();
				for (let j = 1; j <= 10; j++) {
					let currslot = mytable.rows[0].cells[j].innerHTML.toLowerCase();

					let temp_roomid = mytable.rows[i].cells[j].childNodes[1].value;
					for (element in room_list) {
						if (room_list[element].roomid == temp_roomid && temp_roomid != '0') {
							let temproom = room_list[element].schedule[currday][currslot];
							if (temproom.section.length == 0) {
								temproom.teacherid = timetable.teacher_subject_data.find(x => x.subjectcode === mytable.rows[i].cells[j].childNodes[0].value).teacherid;
								temproom.subjectcode = mytable.rows[i].cells[j].childNodes[0].value;
								temproom.section.push(document.getElementById("section_option").value);
								temproom.semester = document.getElementById("semester_option").value;
								temproom.course = document.getElementById("course_option").value;
							}
							else if (temproom.section.length > 0) {
								temproom.section.push(document.getElementById("section_option").value);
							}
						}
					}


					let temp_subject = document.getElementById("mytable").rows[i].cells[j].childNodes[0].value;
					if (temp_subject != '' && temp_roomid != '0') {
						let temp_facultyid_real = timetable.teacher_subject_data.find(x => x.subjectcode === temp_subject).teacherid;
						for (temp_facultyid in faculty_data) {
							if (temp_facultyid_real == faculty_data[temp_facultyid].teacherid) {
								// console.log(faculty_data[temp_facultyid])
								let temp_faculty = faculty_data[temp_facultyid].schedule[currday][currslot];
								if (temp_faculty.section.length > 0) {
									faculty_data[temp_facultyid].schedule[currday][currslot].section.push(document.getElementById("section_option").value);
								}
								else if (temp_faculty.section.length == 0) {
									faculty_data[temp_facultyid].schedule[currday][currslot].section = [document.getElementById("section_option").value];
									faculty_data[temp_facultyid].schedule[currday][currslot].subjectcode = document.getElementById("mytable").rows[i].cells[j].childNodes[0].value;
									faculty_data[temp_facultyid].schedule[currday][currslot].course = document.getElementById("course_option").value;
									faculty_data[temp_facultyid].schedule[currday][currslot].semester = document.getElementById("semester_option").value;
									faculty_data[temp_facultyid].schedule[currday][currslot].roomid = [document.getElementById("mytable").rows[i].cells[j].childNodes[1].value];
								}
								// console.log(faculty_data[temp_facultyid])
							}
						}
					}
				}
			}
			// console.log(faculty_data);
			// console.log("=====================================================");
			// console.log(room_list);
			console.log(':::::  SECOND PHASE DONE  :::::');
			resolve();
		} catch (error) {
			console.error(':::::  ERROR IN FIXTIME SECOND PHASE :::::', error);
			reject(error);
		}
	});
}
const updateCounter = () => {                            	//  this function updates the counter of currently allocated classes in the timetable data
	let mytable = document.getElementById("mytable");
	let teacher_subject_table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	for (let k = 0; k < teacher_subject_table.rows.length; k++) {
		teacher_subject_table.rows[k].cells[6].firstChild.innerHTML = 0;
	}
	for (let i = 1; i <= 7; i++) {
		for (let j = 1; j <= 10; j++) {
			let sl_subjectcode = mytable.rows[i].cells[j].childNodes[0].value;
			if (sl_subjectcode == '') {
				continue;
			}
			if (teacher_subject_table.rows) {
				for (let k = 0; k < teacher_subject_table.rows.length; k++) {
					if (teacher_subject_table.rows[k].cells[3].firstChild.innerHTML === sl_subjectcode) {
						teacher_subject_table.rows[k].cells[6].firstChild.innerHTML = parseInt(teacher_subject_table.rows[k].cells[6].firstChild.innerHTML) + 1;
					}
					if (parseInt(teacher_subject_table.rows[k].cells[6].firstChild.innerHTML) < parseInt(teacher_subject_table.rows[k].cells[4].firstChild.innerHTML)) {
						let column = teacher_subject_table.rows[k].cells[6].firstChild;
						column.classList = ("text", "text-warning", "more_lectures");

					}
					else if (parseInt(teacher_subject_table.rows[k].cells[6].firstChild.innerHTML) == parseInt(teacher_subject_table.rows[k].cells[4].firstChild.innerHTML)) {
						let column = teacher_subject_table.rows[k].cells[6].firstChild;
						column.classList = ("text", "text-success");
					}
					else if (parseInt(teacher_subject_table.rows[k].cells[6].firstChild.innerHTML) > parseInt(teacher_subject_table.rows[k].cells[4].firstChild.innerHTML)) {
						let column = teacher_subject_table.rows[k].cells[6].firstChild;
						column.classList = ("text", "text-danger", "less_lectures");
					}
				}
			}
		}
	}
}
const validateTeacherSubject = () => {						//  this function validates the teacher and subject data in the table and returns true if the data is valid else false
	updateCounter();
	let mytable = document.getElementById("mytable");
	let isValid = true;
	// console.log(':::::  TIMETABLE DATA :::::', timetable);


	for (let i = 1; i <= 7; i++) {
		let currday = mytable.rows[i].cells[0].innerHTML.toLowerCase();
		for (let j = 1; j <= 10; j++) {
			let currslot = mytable.rows[0].cells[j].innerHTML.toLowerCase();

			let curr_slot_room = mytable.rows[i].cells[j].childNodes[1].value;
			let subjectCode = mytable.rows[i].cells[j].childNodes[0].value;

			// Skip room with ID '0'
			if (curr_slot_room === '0' || subjectCode === '') {
				continue;
			}

			// Validate if the room exists in room_list
			for (elementr in room_list) {
				if (room_list[elementr].roomid == curr_slot_room && curr_slot_room != '0') {
					let temproom = room_list[elementr].schedule[currday][currslot];
					// console.log("=====================================\n", curr_slot_room, subjectCode);


					let roomSchedule = room_list[elementr].schedule[currday][currslot];
					let teacherId = timetable.teacher_subject_data.find(x => x.subjectcode === subjectCode).teacherid;

					// Skip teacher with ID '0'
					if (!teacherId || teacherId === '0') {
						continue;
					}

					// Check if room has any assigned section
					if (roomSchedule.section.length > 0) {
						// Subject mismatch check
						if (roomSchedule.subjectcode !== subjectCode) {
							setTimeout(() => {
								float_error_card_func(`Type 1 - Room conflict <br>Diffrent Subject Conflicted at ${currday.toUpperCase()} ${currslot} slot`, `Another class is allotted ${roomSchedule.subjectcode} as subject in this slot already.<br>[ Choose another class if the subject is diffrent ]`, "primary");
							}, 1000);
							isValid = false;
						}
						// Teacher mismatch check
						if (roomSchedule.teacherid !== teacherId) {
							setTimeout(() => {
								float_error_card_func(`Type 2 - Room conflict <br>Teacher Conflicted at ${currday.toUpperCase()} ${currslot} slot`, `[ ${roomSchedule.teacherid} ] is teaching ${roomSchedule.subjectcode} in this slot. <br>[ Choose another class if the teacher is diffrent ]`, "info");
							}, 2000);
							isValid = false;
						}
					}
					// Validate the teacher's schedule
					for (element in faculty_data) {
						if (faculty_data[element].teacherid === teacherId) { // the teacher who is teaching the subject
							// console.log("========"+faculty_data[element].teacherid, teacherId);
							let teacherSchedule = faculty_data[element].schedule[currday][currslot];

							// If the teacher is assigned in the same slot
							if (teacherSchedule.subjectcode === subjectCode && teacherSchedule.section.length > 0) { // review this condition
								if (teacherSchedule.section.includes(document.getElementById("section_option").value) && teacherSchedule.section.length > 1) {
									setTimeout(() => {
										// float_error_card_func(`${teacherSchedule.section.includes(document.getElementById("section_option").value)} && ${teacherSchedule.section} ${currday} ${currslot}`,"","info")
										float_error_card_func(`Merge at ${currday.toUpperCase()} ${currslot}`, ``, "warning");
									}, 500);
								}
								if (!teacherSchedule.section.includes(document.getElementById("section_option").value) && teacherSchedule.section.length == 1) {
									setTimeout(() => {
										float_error_card_func(`Merge at ${currday.toUpperCase()} ${currslot}`, ``, "warning");
									}, 500);
								}
								// isValid = false;
							}

							// If the teacher is teaching a different subject in the same slot
							if (teacherSchedule.subjectcode && teacherSchedule.subjectcode !== subjectCode) {
								float_error_card_func(`Type 11 tester- Teacher Conflict at ${currday.toUpperCase()} ${currslot} slot`, `Another class is allotted ${teacherSchedule.subjectcode} as subject in this slot already.`, "danger");
								isValid = false;
							}
							// if (teacherSchedule.section.length > 0) {
							// 	if (teacherSchedule.section.includes(document.getElementById("section_option").value)) {
							// 		float_error_card_func(`Type 22 tester - Teacher Conflict at ${currday.toUpperCase()} ${currslot} slot`, `${faculty_data[element].name} [ ${faculty_data[element].teacherid} ] is teaching ${teacherSchedule.subjectcode} in this slot. [ change your teacher or choose another class ]`, "danger");
							// 		isValid = false;
							// 	}
							// }
							let teachercurrroomnow = "[NA :: developing rn]";
							// let teachercurrroomnow = room_list.find(x => x.roomid === faculty_data[element].schedule[currday][currslot].roomid[0]).name || "No Room Assigned";
							console.log(teachercurrroomnow);
							if (teacherSchedule.subjectcode !== "" && teacherSchedule.subjectcode !== subjectCode) {
								float_error_card_func(`Type 1 - Teacher Conflict at ${currday.toUpperCase()} ${currslot} slot`, `${faculty_data[element].name} [ ${faculty_data[element].teacherid} ] <br><i><b>( current teacher )</b></i> is teaching ${teachercurrroomnow} at the current time.`, "danger");
								isValid = false;
							}
							if (room_list[elementr].roomid.length != 0 && teacherSchedule.roomid[0] && teacherSchedule.roomid[0] !== curr_slot_room) {
								if(!teacherSchedule.section.includes(document.getElementById("section_option").value)){
									float_error_card_func(`Type 2 - Teacher Conflict at ${currday.toUpperCase()} ${currslot} slot`, `${faculty_data[element].name} [ ${faculty_data[element].teacherid} ] <br><i><b>( current teacher )</b></i> is teaching ${teacherSchedule.subjectcode} at ${teachercurrroomnow} at the current time.`, "danger");
									isValid = false;
								}
							}
						}
					}
				}
			}

		}
	}

	console.log('::::: VALIDATION COMPLETE :::::');
	return isValid;
};
const save_room_list = () => {	 	// save_timetable_func helper functions	//  this function saves the room list data to the server [ database ] and returns the promise
	return new Promise((resolve, reject) => {
		fetch(`${localhost}/room/savemultiple`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getCookie('accessToken')}`
			},
			credentials: 'include',
			body: JSON.stringify({
				"data": room_list
			})
		}).then(response => {
			response.json()
			if (response.ok) {
				float_error_card_func('Room Data Saved Success', '', 'success');
				resolve(response);
			} else {
				float_error_card_func('Room Data Saving Failed', '', 'danger');
				throw new Error(':::::  Room Data Saving Failed :::::');
			}
		}).catch(error => {
			float_error_card_func('Room Data Saving Failed', '', 'danger');
			console.error('::::: Error Saving Data (Server Error) :::::', error);
			reject(error);
		});
	});
}
const save_faculty_list = () => { 	// save_timetable_func helper functions	//  this function saves the faculty list data to the server [ database ] and returns the promise
	return new Promise((resolve, reject) => {
		fetch(`${localhost}/faculty/update`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getCookie('accessToken')}`
			},
			body: JSON.stringify({ "facultyList": faculty_data })
		}).then(parsedData => {
			float_error_card_func("Faculty data Saved", "", "success");
			console.log(':::::  Faculty Data Saved Successfully  :::::', parsedData);
			resolve(parsedData);
		}).catch(error => {
			float_error_card_func("Faculty Data Not Saved <br>Server Error", "", "danger");
			reject(error);
			console.error('::::: ERROR SAVING DATA :::::', error);
		});
	});
}
const save_timetable_func = () => {                         	//  function below calculate and construct the timetable json and send that to the backend 
	if (validateTeacherSubject()) {
		blocking();
		let tempteachersubjectdata = [];
		let scheduleslot = {}
		let mytable = document.getElementById("mytable");
		for (let i = 1; i <= 7; i++) {
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
				} else {
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
			let teachername = row.cells[1].firstChild.innerHTML;
			let teacherid = row.cells[2].firstChild.innerHTML;
			let subjectid = row.cells[3].firstChild.innerHTML;
			let weekly_hrs = row.cells[4].firstChild.innerHTML;
			let theory_practical = row.cells[5].firstChild.innerHTML;

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

		fetch(`${localhost}/table/save-timetable`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getCookie('accessToken')}`
			},
			body: JSON.stringify(jsonData),
			credentials: 'include'
		}).then(response => {
			if (response.ok) {
				float_error_card_func("Timetable Saved Successfully", "", "success");
				return response.json();
			} else {
				float_error_card_func("Timetable Not Saved", "", "danger");
				throw new Error(':::::  DATA NOT SAVED DUE TO NETWORK ERROR :::::');
			}
		}).then(async () => {
			await fixtime_firstphase();
			timetable = jsonData;
			await fixtime_secondphase();
			await save_room_list();
			await save_faculty_list();
			setTimeout(() => {
				unblocking();
				initializePage();
			}, 1000);
		}).catch(error => {
			float_error_card_func("Timetable Not Saved <br>Server Error", "", "danger");
			console.error('::::: ERROR SAVING DATA :::::', error);
		});
	} else {
		setTimeout(() => {
			float_error_card_func("Validation Failed <br>Timetable Not saved", "", "warning");
		}, 3000);
	}
}

const add_select_box_to_mytable = () => {               	//  this function below adds 2 select option fields to each table cell in the table  
	return new Promise((resolve, reject) => {
		try {
			let mytable = document.getElementById("mytable");
			for (let i = 1; i < mytable.rows.length; i++) {
				for (let j = 1; j < mytable.rows[1].cells.length; j++) {
					let tempcell = mytable.rows[i].cells[j];
					let select = document.createElement('select');
					select.setAttribute('class', 'form-select form-select text subjectselectbox fw-bold');
					select.setAttribute('style', 'white-space: pre-wrap;');
					tempcell.appendChild(select);
					let select2 = document.createElement('select');
					select2.setAttribute('class', 'form-select form-select text roomselectbox');
					select2.setAttribute('style', 'white-space: pre-wrap;');
					tempcell.appendChild(select2);
				}
			}
			resolve();
		} catch (error) {
			console.error(':::::  ERROR IN ADD SELECT BOX TO MYTABLE :::::', error);
			reject(error);
		}
	});
}
const add_rooms_options_to_mytable = (room_list) => {		// 	this add options to room select box in the main table dynamically with the data obtained from mongoDB
	// room_list.sort((a, b) => a.roomid.localeCompare(b.roomid));
	room_list.sort((a, b) => {
		if (a.roomid === '0') return -1;
		if (b.roomid === '0') return 1;
		return a.name.localeCompare(b.name);
	});
	for (let i = 1; i <= 7; i++) {
		let currday = mytable.rows[i].cells[0].innerHTML.toLowerCase();
		for (let j = 1; j <= 10; j++) {
			let currslot = mytable.rows[0].cells[j].innerHTML.toLowerCase();

			mytable.rows[i].cells[j].childNodes[1].innerHTML = "";
			let tempselectedvalue = timetable.schedule[currday][currslot].class_id;
			for (ele in room_list) {
				// Object.entries(room_list).forEach(([key, value]) => {
				let option = document.createElement("option");
				option.value = room_list[ele].roomid;
				option.text = room_list[ele].name;
				if (room_list[ele].roomid == '0') {
					option.text = "";
				}
				option.setAttribute("class", "text");
				// console.log(room_list[key].schedule[currday][currslot].section.length);
				if (room_list[ele].schedule[currday][currslot].section.length == 1) {
					option.setAttribute("class", "bg-success text-light bg-gradient text fw-bold");
					option.innerHTML = `${room_list[ele].name} ${room_list[ele].schedule[currday][currslot].semester} [ ${room_list[ele].schedule[currday][currslot].section.sort()} ]`;
				}
				else if (room_list[ele].schedule[currday][currslot].section.length == 2) {
					option.setAttribute("class", "bg-primary text-light bg-gradient text fw-bold");
					option.innerHTML = `${room_list[ele].name} ${room_list[ele].schedule[currday][currslot].semester} [ ${room_list[ele].schedule[currday][currslot].section.sort()} ]`;
				}
				else if (room_list[ele].schedule[currday][currslot].section.length == 3) {
					option.setAttribute("class", "bg-warning text-dark bg-gradient text fw-bold");
					option.innerHTML = `${room_list[ele].name} ${room_list[ele].schedule[currday][currslot].semester} [ ${room_list[ele].schedule[currday][currslot].section.sort()} ]`;
				}
				else if (room_list[ele].schedule[currday][currslot].section.length == 4) {
					option.setAttribute("class", "bg-danger text-light bg-gradient text fw-bold");
					option.innerHTML = `${room_list[ele].name} ${room_list[ele].schedule[currday][currslot].semester} [ ${room_list[ele].schedule[currday][currslot].section.sort()} ]`;
				}
				else if (room_list[ele].schedule[currday][currslot].section.length > 4) {
					option.setAttribute("class", "bg-dark text-light bg-gradient text fw-bold");
					option.innerHTML = `${room_list[ele].name} ${room_list[ele].schedule[currday][currslot].semester} [ ${room_list[ele].schedule[currday][currslot].section.sort()} ]`;
				}
				// console.log(option.value, option.text)
				if (room_list[ele].roomid == tempselectedvalue) {
					option.selected = true;
				}
				mytable.rows[i].cells[j].childNodes[1].appendChild(option);
			};
		}
	}
};
const add_subjects_options_to_mytable = (subject_list) => { // 	this add options to subject select box in the main table dynamically with the data obtained from mongoDB
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
			// console.log(element);
			if(element.teacherid == "0"){
				return;
			}
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

const fetch_room_list = () => {                         	//  this function fetches the room list data form the server [ database ] and store the variable to the local variable for future use	
	return new Promise((resolve, reject) => {
		try {
			fetch(`${localhost}/room/getall?allowed_course=${document.getElementById('course_option').value}`, {
				// fetch(`${localhost}/room/getall`, {	// for testing get all rooms
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => {
				if (!response.ok) {
					throw new Error(':::::  Room Data not available [ SERVER ERROR ] :::::');
				}
				return response.json()
			}).then(data => {
				room_list = data.data;
				console.log(room_list)
				resolve();
				// add_rooms_options_to_mytable(room_list);
			}).catch(error => {
				console.error('Room Data not available [ SERVER ERROR ] :::: ', error);
				reject(error);
			});
		} catch (error) {
			console.error('Error fetching room data:', error);
			reject(error);
		}
	});
};
const fetch_faculties_list = () => {                    	//  this function fetches the faculty list data form the server [ database ] and store the variable to the local variable for future use  
	return new Promise((resolve, reject) => {
		try {
			if (timetable) {
				let teacher_subject_data = timetable.teacher_subject_data;
				let teacher_query_list = [];
				for (let i = 0; i < teacher_subject_data.length; i++) {
					if (teacher_subject_data[i].teacherid != "0") {
						teacher_query_list.push(teacher_subject_data[i].teacherid);
					}
				}
				// console.log(teacher_query_list);

				fetch(`${localhost}/faculty/get`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${getCookie('accessToken')}`
					},
					credentials: 'include',
					body: JSON.stringify({ "facultyList": teacher_query_list })
				})
					.then(response => {
						if(response.ok){
							return response.json();
						}else{
							throw new Error(':::::  Room Data not available [ SERVER ERROR ] :::::');
						}
					}).then(data => {
						data = data.data;
						faculty_data = data;
						console.log(faculty_data);
						resolve();
					})
					.catch(error => {
						console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error)
						reject(error);
					});
			}
		} catch (error) {
			console.error('Error fetching faculty data:', error);
			reject(error);
		}
	});
};
const render_tables = (timetable) => {                           	// renders the timetable on the main table [ uses the same strucute of JSON as it POST to the backend]
	// rendering the second table first
	if (timetable) {
		// float_error_card_func("Timetable Available", "", "success");
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
			cell_insert = document.createElement('span');
			cell_insert.setAttribute("class", "text");
			cell_insert.innerHTML = localteacher_subject_data[i].teachername;
			cell.appendChild(cell_insert);
			cell.setAttribute("class", "border-dark border-3");

			// teacher select box render
			cell = newRow.insertCell();
			cell_insert = document.createElement('span');
			cell_insert.setAttribute("class", "text");
			cell_insert.innerHTML = localteacher_subject_data[i].teacherid;
			cell.appendChild(cell_insert);
			cell.setAttribute("class", "border-dark border-3");

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
			cell.setAttribute("class", "border-dark border-3 h5 fw-bold");

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
			cell.setAttribute("class", "border-dark border-3 h4 fw-bold");
		}
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
	else {
		let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
		table.innerHTML = "";
		reset_table();
		// float_error_card_func("Timetable Not Available", "", "danger");
	}
}
const fetch_timetable = () => {                        		//  this function fetches the timetable data form the server [ database ] and store the variable to the local variable for future use
	return new Promise((resolve, reject) => {
		try {
			let course = document.getElementById("course_option").value;
			let semester = document.getElementById("semester_option").value;
			let section = document.getElementById("section_option").value;

			fetch(`${localhost}/table/get-timetable?` + new URLSearchParams({ course: course, semester: semester, section: section }), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => {
				if (!response.ok) {
					throw new Error(':::::  Room Data not available [ SERVER ERROR ] :::::');
				}
				return response.json()
			}).then(data => {
				console.log(data);
				timetable = data.data;        // Do something with the response data here 
				console.log(timetable);
				render_tables(timetable);
			}).then(() => {
				updateCounter();
				resolve();
			}).catch(error => {
				float_error_card_func("TimeTable - Server Error", "", "danger");
				console.error('Data unavailable:', error);
				reject(error);
			});
		} catch (error) {
			// document.getElementById("loader").style.display = "none";
			console.error('Error fetching timetable:', error);
			reject(error);
		}
	});
}
const initializePage = async () => {                        //  this function initializes the page by fetching the room list, faculty list and timetable data from the server
	try {
		blocking();
		await fetch_timetable();
		await fetch_faculties_list();
		await fetch_room_list()
		add_rooms_options_to_mytable(room_list)
		setTimeout(() => {
			unblocking();
			document.getElementById("loader").style.display = "none";
		}, 1500);
		if (timetable) {
			float_error_card_func("Initialization Successful", "", "success");
		} else {
			throw new Error('Initialization Failed');
		}
	} catch (error) {
		setTimeout(() => {
			unblocking();
			document.getElementById("loader").style.display = "none";
			document.getElementById("save_tt_json").disabled = true;
		}, 1500);
		//reset the table to the initial state to avoid any error
		let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
		table.innerHTML = "";
		reset_table();
		float_error_card_func("Initialization Failed <br> Server Error", "", "danger");
		console.error('Error during initialization:', error)
	};
};
const reset_table = () => {                             	//  this function resets the table to the initial state by removing all the data from the table
	let mytable = document.getElementById("mytable");
	for (let i = 1; i <= 7; i++) {
		for (let j = 1; j <= 10; j++) {
			mytable.rows[i].cells[j].childNodes[0].value = "";
			mytable.rows[i].cells[j].childNodes[1].value = "0";
		}
	}
};
const addcopybutton = () => {
	let table = document.getElementById("mytable");
	for (let i = 1; i <= 7; i++) {
		for (let j = 1; j <= 10; j++) {
			let div = document.createElement("div");
			div.classList = ("popover-content");
			if (j > 1) {
				let button = document.createElement("button");
				button.classList = ("copy-left popover-button btn btn-primary rounded-start-pill p-1 me-0");
				button.style = "background-color: var(--brand-cyan);"
				button.innerHTML = `<i class="bi bi-arrow-bar-left" style="-webkit-text-stroke-width: 1px;"></i><i class="bi bi-clipboard-data-fill"></i>`;
				button.addEventListener("click", () => {
					table.rows[i].cells[j].childNodes[0].value = table.rows[i].cells[j - 1].childNodes[0].value;
					table.rows[i].cells[j].childNodes[1].value = table.rows[i].cells[j - 1].childNodes[1].value;
				});
				div.appendChild(button);
			}
			let reset_button2 = document.createElement("button");
			reset_button2.classList = ("copy-reset popover-button btn btn-dark rounded-0 p-1 ms-0 px-2");
			reset_button2.style = "background-color: var(--Hard-Background);"
			reset_button2.innerHTML = `<i class="bi bi-arrow-clockwise" style="-webkit-text-stroke-width: 1px;"></i>`;
			reset_button2.addEventListener("click", () => {
				table.rows[i].cells[j].childNodes[0].value = "";
				table.rows[i].cells[j].childNodes[1].value = "0";
			});
			div.appendChild(reset_button2);

			if (j < 10) {
				let button2 = document.createElement("button");
				button2.classList = ("copy-right popover-button btn btn-danger rounded-end-pill p-1 ms-0");
				button2.style = "background-color: var(--brand-red);"
				button2.innerHTML = `<i class="bi bi-clipboard-data-fill"></i><i class="bi bi-arrow-bar-right" style="-webkit-text-stroke-width: 1px;"></i>`;
				button2.addEventListener("click", () => {
					table.rows[i].cells[j].childNodes[0].value = table.rows[i].cells[j + 1].childNodes[0].value;
					table.rows[i].cells[j].childNodes[1].value = table.rows[i].cells[j + 1].childNodes[1].value;
				});
				div.appendChild(button2);
			}
			table.rows[i].cells[j].appendChild(div);
		}
	}
}
//  adding event listners to the buttons and select boxes
document.getElementById("save_tt_json").addEventListener("click", save_timetable_func); 	// [ save TT JSON on DB button eventlistner ]
document.getElementById("reset_tt").addEventListener("click", reset_table);				// [ reset TT button eventlistner ]
document.getElementById('course_option').addEventListener('change', initializePage);  	// [ course select box eventlistner ]
document.getElementById('semester_option').addEventListener('change', initializePage);  // [ semester select box eventlistner ]
document.getElementById('section_option').addEventListener('change', initializePage);	// [ section select box eventlistner ]
document.getElementById("mytable").addEventListener("change", validateTeacherSubject);
document.addEventListener('DOMContentLoaded', async () => {                                     //  this function initializes the page
	document.getElementById("semester_option").value = "3";				// ===========xxxxxxxxxxxxxxxxxxxxxxxxx remove this
	addDynamicSectionOptions();
	// document.getElementById("section_option").value = "B";				// ===========xxxxxxxxxxxxxxxxxxxxxxxxx remove this
	await add_select_box_to_mytable();            // add subject and room select boxes to all the table cells  
	addcopybutton();
	initializePage();                       // initialize the page by fetching the room list, faculty list and timetable data from the server
});