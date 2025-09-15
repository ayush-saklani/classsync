let faculty_data;
let messageCounter = 0;

const updatefaculty = () => {					// function to add faculty	
	document.getElementById("update_faculty_button").disabled = true;
	let id = document.getElementById("update_faculty_id").value;
	let name = document.getElementById("update_faculty_name").value;
	id = id.trim();
	name = name.trim();
	if(id==="0"){
		float_error_card_func('Reserved ID Error', 'ID 0 is reserved for Admin <br> please dont do that', 'warning');
		document.getElementById("update_faculty_button").disabled = false;
		return;
	}
	if (id === "" || name === "") {
		float_error_card_func('Empty Field Error', 'Please fill all the fields before saving the data ( ID and Name are required )', 'warning');
		document.getElementById("update_faculty_button").disabled = false;
		return;
	}
	
	fetch(`${localhost}/faculty/remove?teacherid=` + id,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getCookie('accessToken')}`
		}
	}).then(response => {
		if(response.ok){
			return response.json();
		}
		else{
			throw new Error('Faculty Data not available [ SERVER ERROR ] ::::', response.status);
		}
	}).then(parsedData => {
		// float_error_card_func('Faculty Removed Successfully', `Faculty Removed Successfully <br><b>ID:${id}</b> deleted`, 'success');
		console.log(':::::  TEACHER DATA REMOVED SUCCESSFULLY  :::::', parsedData);
	}).then(() => {
		fetch(`${localhost}/faculty/add?teacherid=` + id + '&name=' + name, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getCookie('accessToken')}`
			}
		}).then(response => {
			if (response.status === 403) {
				throw new Error('Faculty not added <br>This ID already exists please use a different ID');
			}
			return response.json();
		}).then((parsedData) => {
			document.getElementById("update_faculty_button").disabled = false;
			// float_error_card_func('Faculty Added Successfully', `Faculty Name: ${name} and ID: ${id} Added`, 'success');
			console.log(':::::  TEACHER DATA ADDED SUCCESSFULLY  :::::', parsedData);
		}).catch(error => {
			document.getElementById("update_faculty_button").disabled = false;
			float_error_card_func('Faculty not added<br>', error||'Faculty not removed <br> Server Error', 'danger');
			console.error('::::: ERROR ADDING DATA :::::', error);
		});
	}).then(() => {
		float_error_card_func('Faculty data updated', '', 'success');
		fetch_faculties_list();
	}).catch(error => {
		document.getElementById("update_faculty_button").disabled = false;
		float_error_card_func('Faculty not updated<br>', error||'Faculty not updated <br> Server Error', 'danger');
		console.error('::::: ERROR REMOVING DATA :::::', error);
	});
};
document.addEventListener('DOMContentLoaded', fetch_faculties_list);
document.getElementById("add_faculty_button").addEventListener("click", addfaculty);
document.getElementById("remove_faculty_button").addEventListener("click", removefaculty);
document.getElementById("update_faculty_button").addEventListener("click", updatefaculty);