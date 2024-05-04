// add roe plus button 
document.getElementById("add_row").addEventListener("click", ()=>{
	add_row_func();
	updateItAll();
});
// teacher subject relation table ka listner
document.getElementById("save_sub_teacher_table").addEventListener("click", save_sub_teacher_table_func);

// add event to all the select box that updates the rows
const updateItAll = ()=>{
	let selectors = document.getElementsByClassName("form-select");
	for(let i = 0;i<selectors.length;i++){
		selectors[i].addEventListener("change",update_detail_table);
	}
}
// add subject and room select boxes to all the table cells  
addselectboc_tomyteachertable();

// e.rows[1].cells[1].childNodes[3].options[e.rows[1].cells[1].childNodes[3].selectedIndex].value   