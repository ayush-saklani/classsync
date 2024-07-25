// Sample data for generating dropdowns will be fetched from apis and database
let faculty_data;
let subjectdata;
let room_list;
let timetable;
let local_faculty_data;
let messageCounter = 0;


const save_table_func = () => {                         //  function below calculate and construct the timetable json and send that to the backend 
    document.getElementById("save_tt_json").disabled = true;
    let scheduleslot = {}
    let tempteachersubjectdata = [];
    if (!timetable.schedule) {
        let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        let currcol = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"];
        for (let i = 1; i <= 7; i++) {
            let currrow = days[i - 1];
            let tempdayslot = {}
            for (let j = 1; j <= 10; j++) {
                tempdayslot[currcol[j - 1]] = {
                    "class_id": "0",
                    "subjectcode": "",
                    "slotdata": ""
                }
            }
            scheduleslot[currrow] = tempdayslot;
        }
    }
    else {
        scheduleslot = timetable.schedule;
    }
    let tableBody = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
    for (let i = 0; i < tableBody.rows.length; i++) {
        let row = tableBody.rows[i];

        let subjectname = row.cells[0].firstChild.innerHTML;
        let teacherid = row.cells[1].firstChild.value;
        let subjectid = row.cells[2].firstChild.innerHTML;
        let weekly_hrs = row.cells[3].firstChild.innerHTML;
        let theory_practical = row.cells[4].firstChild.innerHTML;
        let teachername = row.cells[1].firstChild.options[row.cells[1].firstChild.selectedIndex].textContent;


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

    // Convert JSON data to a string
    const jsonDataString = JSON.stringify(jsonData, null, 4);
    console.log(jsonData);

    fetch(`${localhost}/table/save-timetable`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
        body: jsonDataString,
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                float_error_card_func("Faculty Data Saved Successfully", "", "success");
                return response.json();
            } else {
                float_error_card_func("Faculty Data Not Saved<br>Server Error", "", "danger");
                throw new Error(':::::  FACULTY DATA NOT SAVED DUE TO NETWORK ERROR :::::');
            }
        })
        .then(() => {
            setTimeout(initializePage, 1000);
        })
        .catch(error => {
            float_error_card_func("Faculty Data Not Saved<br>Server Error", "", "danger");
            console.error('::::: FACULTY ERROR SAVING DATA :::::', error);
        });
}
const render_tables = () => {                           // renders the table [ uses the same strucute of JSON as it POST to the backend]
    if (timetable) {
        float_error_card_func("Section Data Available", "", "success");
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
            select = document.createElement('select');
            select.setAttribute('class', 'form-select text teacherchoosefield');
            cell.appendChild(select);
            let tempTeacherID = localteacher_subject_data[i].teacherid ? localteacher_subject_data[i].teacherid : "0";
            for (let ele in faculty_data) {
                let option = document.createElement('option');
                option.value = faculty_data[ele].teacherid;
                option.text = faculty_data[ele].name;
                if (faculty_data[ele].teacherid == tempTeacherID && tempTeacherID != "0") {
                    option.selected = true;
                    // console.log(ele)
                    select.disabled = true;
                }
                select.appendChild(option);
            }
            cell.setAttribute("class", "border-dark border-3 p-0");

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
            cell.setAttribute("class", "border-dark border-3");

            cell = newRow.insertCell();
            cell_insert = document.createElement("span");
            cell_insert.innerHTML = localteacher_subject_data[i].theory_practical.charAt(0).toUpperCase() + localteacher_subject_data[i].theory_practical.slice(1);
            cell_insert.setAttribute("class", "text");
            cell.appendChild(cell_insert);
            cell.setAttribute("class", "border-dark border-3");
        }
    }
    else {
        let table = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
        table.innerHTML = "";
        float_error_card_func("Section Data Unavailable", "", "danger");
    }
}

const fetch_faculties_list = () => {                    //  this function fetches the faculty list data form the server [ database ] and store the variable to the local variable for future use  
    return fetch(`${localhost}/faculty/getall`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            data = data.data;
            console.log(data);
            faculty_data = data;
            faculty_data.sort((a, b) => (a.name > b.name) ? 1 : -1); 
        })
        .then(() => {
            float_error_card_func('Faculty Data Fetched Successfully', '', 'success');
        })
        .catch(error => {
            float_error_card_func('Faculty Data Unavailable<br>Server Error', '', 'danger');
            console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error)
        });
};
const fetch_timetable = () => {                        //  this function fetches the timetable data form the server [ database ] and store the variable to the local variable for future use
    let course = document.getElementById("course_option").value;
    let semester = document.getElementById("semester_option").value;
    let section = document.getElementById("section_option").value;

    fetch(`${localhost}/table/get-timetable?` + new URLSearchParams({ course: course, semester: semester, section: section }), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success == true) {
                timetable = data.data;
                console.log(timetable);
            }
            else {
                console.log(data.message);
                fetch(`${localhost}/subjecttable/get?` + new URLSearchParams({ course: course, semester: semester }), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.data);
                        timetable = data.data;
                    })
                    .then(() => {
                        render_tables();
                        document.querySelectorAll(".teacherchoosefield").forEach(element => {
                            element.disabled = false;
                        });
                        float_error_card_func("New Section Detection", "Time Table Data was not available.<br>A new <b>Empty</b> Time Table will be created.", "warning");
                    })
            }
        })
        .then(() => {
            render_tables();
        })
        .then(() => {
            document.getElementById("save_tt_json").disabled = false;
        })
        .catch(error => {
            float_error_card_func("Timetable Unavailable<br>Server Error", "", "danger");
            console.error('Data unavailable:', error)
        });
}
const initializePage = () => {                          //  this function initializes the page by fetching the room list, faculty list and timetable data from the server
    fetch_faculties_list()
        .then(() => fetch_timetable())
        .then(() => {
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 2000);
            float_error_card_func("Initialization Successful", "", "success");
        })
        .catch(error => {
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 2000);
            float_error_card_func("Initialization Failed<br>Server Error", "", "danger");
            console.error('Error during initialization:', error)
        });
};
const reset_table = () => {                             //  this function resets the table to the initial state by removing all the data from the table
    let mytable = document.getElementById("teacher_table").getElementsByTagName('tbody')[0];
    for (let i = 0; i < mytable.rows.length; i++) {
        for (let j = 0; j < mytable.rows[i].cells[1].childNodes[0].options.length; j++) {
            if (mytable.rows[i].cells[1].childNodes[0].options[j].value === "0") {
                mytable.rows[i].cells[1].childNodes[0].selectedIndex = j;
                break;
            }
        }
    }
};
// document.getElementById("loader").style.display = "none";
//  adding event listners to the buttons and select boxes
document.getElementById("save_tt_json").addEventListener("click", save_table_func); 	// [ save TT JSON on DB button eventlistner ]
document.getElementById("reset_tt").addEventListener("click", reset_table);
document.getElementById('course_option').addEventListener('change', initializePage);  	// [ course select box eventlistner ]
document.getElementById('semester_option').addEventListener('change', initializePage);  // [ semester select box eventlistner ]
document.getElementById('section_option').addEventListener('change', initializePage);	// [ section select box eventlistner ]
document.addEventListener('DOMContentLoaded', () => {                                     //  this function initializes the page
    document.getElementById('semester_option').value = "6";
    initializePage();                       // initialize the page by fetching the room list, faculty list and timetable data from the server
});