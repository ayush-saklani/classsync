// Sample data for generating dropdowns
const dropdownData = [
	{ label: 'subject_code', options: ['BTech CSE', 'BTech ME', 'BTech EE', 'BTech CE', 'BCA', 'MCA', 'Others'] },
	{ label: 'teacher_name', options: ['1', '2', '3', '4', '5', '6', '7', '8'] },
	{ label: 'subject_name', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'] },
	{ label: 'total_lecture_hours', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'] },
];

let generateDropdownHTML = (label, options) => {
	let html = `<select class="form-select text" name="${label.toLowerCase().replace(' ', '_')}_option">`;
	html += options.map(option => `<option value="${option}">${option}</option>`).join('');
	html += `</select>`;
	return html;
}
document.getElementById("add_row").addEventListener("click", () => {
	var table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	var newRow = table.insertRow(table.rows.length);
	dropdownData.forEach(item => {
		var cellotape = newRow.insertCell();
		cellotape.innerHTML = generateDropdownHTML(item.label, item.options);
	});
});

document.getElementById("save_sub_teacher_table").addEventListener("click", () => {
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
	let jsonData=[];
	jsonData.push({
		"course": document.getElementById("course_option").value,
		"semester":document.getElementById("semester_option").value,
		"section":	document.getElementById("section_option").value,
		"teacher_sub_data": tempjsonData,
	})
	// jsonData.push(tempjsonData);
	console.log(JSON.stringify(jsonData, null, 2));
	// jsonData ka post request marna hai for teacher subject data  
});