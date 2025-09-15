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
								if (!teacherSchedule.section.includes(document.getElementById("section_option").value)) {
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