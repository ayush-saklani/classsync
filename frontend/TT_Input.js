document.getElementById("add_row").addEventListener("click", () => {
	var table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	var newRow = table.insertRow(table.rows.length);
	var cell1 = newRow.insertCell();
	var cell2 = newRow.insertCell();
	var cell3 = newRow.insertCell();
	var cell4 = newRow.insertCell();
	cell1.innerHTML = '<td class="checkfield"><input class="form-control form-control-sm" type="text" placeholder="sub code"></td>';
	cell2.innerHTML = '<td class="checkfield"><input class="form-control form-control-sm" type="text" placeholder="teacher name"></td>';
	cell3.innerHTML = '<td class="checkfield"><input class="form-control form-control-sm" type="text" placeholder="subject name"></td>';
	cell4.innerHTML = '<td class="checkfield"><input class="form-control form-control-sm" type="text" placeholder="hours"></td>';
});




// Sample data for generating dropdowns
const dropdownData = [
	{ label: 'Course', options: ['BTech CSE', 'BTech ME', 'BTech EE', 'BTech CE', 'BCA', 'MCA', 'Others'] },
	{ label: 'Semester', options: ['1', '2', '3', '4', '5', '6', '7', '8'] },
	{ label: 'Section', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'] }
];

let generateDropdownHTML = (label, options) => {
	let html = `<div class="row mt-3">
					<div class="col">
						<div class="form-floating">
							<select class="form-select mb-3 text" name="${label.toLowerCase().replace(' ', '_')}_option">`;

	html += options.map(option => `<option value="${option}">${option}</option>`).join('');

	html += `               </select>
							<label for="${label.toLowerCase().replace(' ', '_')}_option" class="heading-text">${label}</label>
						</div>
					</div>
				</div>`;
	return html;
}

// Function to generate and append dropdowns to container
let generateDropdowns = () => {
	const container = document.getElementById('teacher_table');
	dropdownData.forEach(item => {
		const dropdownHTML = generateDropdownHTML(item.label, item.options);
		container.innerHTML += dropdownHTML;
	});
}

// Call the generateDropdowns function
generateDropdowns();