// Sample data for generating dropdowns
const dropdownData = [
	{ label: 'subject_code', options: [{'xc601':'career skills'} , {'pcs602':'compiler lab'}, {'tcs601':'computer network'}, {'tcs604':'full stack web dev'},{'placementclasses':"placementclasses"}] },
	{ label: 'teacher_name', options: ['ms neelam', 'ms sonal', 'dr dp singh', 'mr ashish garg', 'mr akshay rajput'] },
	{ label: 'total_lecture_hours', options: ['1', '2', '3', '4'] },
];

let generateDropdownHTML = (label, options) => {
	let html = `<select class="form-select text" name="${label.toLowerCase().replace(' ', '_')}_option">`;
	html += options.map(option => `<option value="${option}">${option}</option>`).join('');
	html += `</select>`;
	return html;
}
const add_row_func = () => {
	var table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	var newRow = table.insertRow(table.rows.length);
	dropdownData.forEach(item => {
		var cellotape = newRow.insertCell();
		cellotape.innerHTML = generateDropdownHTML(item.label, item.options);
	});
};
document.getElementById("add_row").addEventListener("click", add_row_func);

const save_sub_teacher_table_func = () => {
	let tempjsonData = [];

	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	// Iterate over each row in the table body
	for (let i = 0; i < tableBody.rows.length; i++) {
		let row = tableBody.rows[i];
		let selectElements = row.getElementsByTagName('select');
		// Object to store data for each row
		let rowData = {};
		// Iterate over each select element in the row
		for (let j = 0; j < selectElements.length; j++) {
			let selectElement = selectElements[j];
			let fieldName = selectElement.getAttribute('name');
			let selectedValue = selectElement.value;
			// Add the selected value to the rowData object
			rowData[fieldName] = selectedValue;
		}
		// Add the rowData object to the tempjsonData array
		tempjsonData.push(rowData);
	}
	// Convert the tempjsonData array to JSON string and log it
	let jsonData = [];
	jsonData.push({
		"course": document.getElementById("course_option").value,
		"semester": document.getElementById("semester_option").value,
		"section": document.getElementById("section_option").value,
		"teacher_sub_data": tempjsonData,
	})
	// jsonData.push(tempjsonData);
	console.log(JSON.stringify(jsonData, null, 2));
	// jsonData ka post request marna hai for teacher subject data  
};
document.getElementById("save_sub_teacher_table").addEventListener("click", save_sub_teacher_table_func);

const save_sub_teacher_table_sync_db = () => {
	let data_fetched_from_db = [
		{
			"subject_code_option": "BTech CSE",
			"teacher_name_option": "1",
			"subject_name_option": "A",
			"total_lecture_hours_option": "A"
		},
		{
			"subject_code_option": "BTech CSE",
			"teacher_name_option": "1",
			"subject_name_option": "A",
			"total_lecture_hours_option": "A"
		}
	];
	
	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	data_fetched_from_db.forEach(Element =>{

	});
	for (let i = 0; i < tableBody.rows.length; i++) {
		let row = tableBody.rows[i];
		let selectElements = row.getElementsByTagName('select');
		// Object to store data for each row
		let rowData = {};
		// Iterate over each select element in the row
		for (let j = 0; j < selectElements.length; j++) {
			let selectElement = selectElements[j];
			let fieldName = selectElement.getAttribute('name');
			let selectedValue = selectElement.value;
			// Add the selected value to the rowData object
			rowData[fieldName] = selectedValue;
		}
		// Add the rowData object to the tempjsonData array
		tempjsonData.push(rowData);
	}
	// Convert the tempjsonData array to JSON string and log it
	let jsonData = [];
	jsonData.push({
		"course": document.getElementById("course_option").value,
		"semester": document.getElementById("semester_option").value,
		"section": document.getElementById("section_option").value,
		"teacher_sub_data": tempjsonData,
	})
	// jsonData.push(tempjsonData);
	console.log(JSON.stringify(jsonData, null, 2));
	// jsonData ka post request marna hai for teacher subject data
	for(let i=0;i<)

}