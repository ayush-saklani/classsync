// Sample data for generating dropdowns will be fetched from apis and database
let globaljsonData ;
let teacher_data = [
	{
		"teacher_name":"ms neelam",
		"teachercode": 9111442
	},
	{
		"teacher_name":"ms sonal",
		"teachercode": 9111443
	},
	{
		"teacher_name":"vc sir",
		"teachercode": 9111444
	},
	{
		"teacher_name":"mr piyush bagla",
		"teachercode": 9111445
	},
	{
		"teacher_name":"mr ashish garg",
		"teachercode": 9111446
	},
	{
		"teacher_name":"mr akshay rajput",
		"teachercode": 9111447
	}
]
let subjectdata = [
	{
		"subjectcode": "xcs601",
		"subjectname":"career skills",
		"weekly_hrs": 2,
		"theory_practical":"theory"
	},
	{
		"subjectcode": "pcs602",
		"subjectname":"compiler lab",
		"weekly_hrs": 2,
		"theory_practical":"practical"
	},
	{
		"subjectcode": "tcs601",
		"subjectname":"computer network",
		"weekly_hrs": 2,
		"theory_practical":"theory"
	},
	{
		"subjectcode": "tcs604",
		"subjectname":"full stack web dev",
		"weekly_hrs": 3,
		"theory_practical":"theory"
	},
	{
		"subjectcode": "placementclasses",
		"subjectname":"placementclasses",
		"weekly_hrs": 4,
		"theory_practical":"theory"
	}
]
const update_detail_table =()=>{
	let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
		let rowfirstdata = row.cells[0].firstChild.value;
		for (let ele in subjectdata){
			if(subjectdata[ele].subjectcode == rowfirstdata){				
				row.cells[2].firstChild.innerHTML = subjectdata[ele].subjectcode.toUpperCase();
				row.cells[3].firstChild.innerHTML = subjectdata[ele].weekly_hrs;
				row.cells[4].firstChild.innerHTML = subjectdata[ele].theory_practical.charAt(0).toUpperCase() + subjectdata[ele].theory_practical.slice(1);
			}
		}
    }
}
// document.getElementById("ppap").addEventListener("click",update_detail_table);
const add_row_func = () => {
    let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.rows.length);
	
	// subject name drop Option
	let cell = newRow.insertCell();
	let html  = `<select class="form-select text">`;
	for (let ele in subjectdata){
		html += `<option value="${subjectdata[ele].subjectcode}">${subjectdata[ele].subjectname}</option>`;
    }
	html += `</select>`;
	cell.innerHTML = html;
	
	// teacher name drop Option
	cell = newRow.insertCell();
	html  = `<select class="form-select text">`;
	for (let ele in teacher_data){
        html += `<option value="${teacher_data[ele].teachercode}">${teacher_data[ele].teacher_name}</option>`;
    }
	html += `</select>`;
	cell.innerHTML = html;

	// empty span tag for cells
    for (let i = 2; i < 5; i++) {
        let cell = newRow.insertCell();
		cell.innerHTML= `<span class="text"></span>`;
    }
	update_detail_table();
};

const save_sub_teacher_table_func = () => {
	let tempjsonData = [];

	let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
	// Iterate over each row in the table body
	for (let i = 0; i < tableBody.rows.length; i++) {
        let row = tableBody.rows[i];
        
		let subjectid = row.cells[0].firstChild.value;
		let teacherid = row.cells[1].firstChild.value;
		let subjectcode = row.cells[2].firstChild.innerHTML;
		let hours = row.cells[3].firstChild.innerHTML;
		let theory_practical = row.cells[4].firstChild.innerHTML;
		let teachername = '';
		let subjectname = '';
		for (let ele of subjectdata) {
			if (ele.subjectcode === subjectid) {
				subjectname = ele.subjectname;
				break;
			}
		}
		for (let ele of teacher_data) {
			if (ele.teachercode == teacherid) {
				teachername = ele.teacher_name;
				break; 
			}
		}
		let rowData = {
			"subjectid":subjectid,
			"teacherid":teacherid,
			"subjectcode":subjectcode,
			"hours":hours,
			"teachername":teachername,
			"subjectname":subjectname,
			"theory_practical":theory_practical,
		}
        tempjsonData.push(rowData);
    }
	
	let jsonData = {
		"course": document.getElementById("course_option").value,
		"semester": document.getElementById("semester_option").value,
		"section": document.getElementById("section_option").value,
		"teacher_subject_data": tempjsonData,
	};
	// jsonData.push(tempjsonData);
	console.log(JSON.stringify(jsonData, null, 2));
	globaljsonData = jsonData;
	// jsonData ka post request marna hai for teacher subject data  
};
const addselectboc_tomyteachertable =  ()=>{
    let mytable = document.getElementById("mytable");
    for (let i = 1; i < mytable.rows.length; i++) {
        for (let j = 1; j < mytable.rows[1].cells.length; j++) {
            let tempcell = mytable.rows[i].cells[j];
            let html  = `
				<select class="form-select form-select-sm text classselectbox">
					<option selected>Subject</option>
				<select>
				<select class="form-select form-select-sm text roomselectbox">
					<option selected>Room</option>
				<select>
				`;
			tempcell.innerHTML = html;
        }        
    }
}
const addselectboc_tomyteachertable_addoptions = () =>{
	let classselectbox = document.querySelectorAll(".classselectbox");
	for(let i in classselectbox.length){
		let html = `
			<select class="form-select form-select-sm text classselectbox">
				<option selected>Subject</option>
			<select>
		`;
		classselectbox[i].innerHTML = html
	}
		
}