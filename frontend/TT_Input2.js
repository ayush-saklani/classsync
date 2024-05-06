// add row when plus button is pressed 
document.getElementById("add_row").addEventListener("click", () => {
	add_row_func();
	updateItAll();
});
// teacher subject relation table ka listner
document.getElementById("save_sub_teacher_table").addEventListener("click", save_sub_teacher_table_func);

// add event to all the select box that updates the rows
const updateItAll = () => {
	let selectors = document.getElementsByClassName("form-select");
	for (let i = 0; i < selectors.length; i++) {
		selectors[i].addEventListener("change", update_detail_table);
	}
}
// add subject and room select boxes to all the table cells  
addselectboc_tomyteachertable();

// e.rows[1].cells[1].childNodes[3].options[e.rows[1].cells[1].childNodes[3].selectedIndex].value   


let values = ["dog", "cat", "parrot", "rabbit"];
let roomvalues = ["cr101", "cr102", "cr103", "cr104"];
document.getElementById("save_tt_json").addEventListener("click", () => {
	fetch('http://127.0.0.1:3000/table/get-room-data', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			temp_obj = data;
			console.log(data);
			letmesee2(data);
		})
		.catch(error => console.error('Room Data unavailable try again later :::: ', error));
		addselectboc_tomyteachertable_addoptions(roomvalues, values)
});
// room and subject data will be passed from api and table below