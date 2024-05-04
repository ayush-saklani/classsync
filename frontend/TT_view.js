// let temp_obj = {
//     "_id": "662fb98949abdb5257ddf223",
//     "course": "btechcse",
//     "semester": "6",
//     "section": "A",
//     "schedule": {
//         "mon": {
//             "11-12": { "class_id": "1031", "Teacher_Name": "MR AKSHAY RAJPUT", "slotdata": "Placement Class  LT202", "_id": "6635d77e56b1b1ca8d250855" },
//             "12-01": { "class_id": "1031", "Teacher_Name": "MR AKSHAY RAJPUT", "slotdata": "Placement Class  LT202", "_id": "6635d77e56b1b1ca8d250856" },
//             "01-02": { "class_id": "2041", "Teacher_Name": "MR PA ANAND / MR \nABHISEKH SHARMA", "slotdata": "XCS601  LT301", "_id": "6635d77e56b1b1ca8d250857" },
//             "03-04": { "class_id": "2031", "Teacher_Name": "MR PA ANAND / MR \nABHISEKH SHARMA", "slotdata": "XCS601  LT302", "_id": "6635d77e56b1b1ca8d250858" },
//             "04-05": { "class_id": "1041", "Teacher_Name": "MR AMRISH", "slotdata": "TCS692  LT201", "_id": "6635d77e56b1b1ca8d250859" },
//             "05-06": { "class_id": "1041", "Teacher_Name": "MR AMRISH", "slotdata": "TCS692  LT201", "_id": "6635d77e56b1b1ca8d25085a" },
//             "_id": "6635d77e56b1b1ca8d25085b"
//         },
//         "tue": {
//             "08-09": { "class_id": "1041", "Teacher_Name": "MR PIYUSH", "slotdata": "TCS693  LT201", "_id": "6635d77e56b1b1ca8d25085c" },
//             "09-10": { "class_id": "2031", "Teacher_Name": "HON’BLE VC SIR", "slotdata": "TCS604  LT302", "_id": "6635d77e56b1b1ca8d25085d" },
//             "10-11": { "class_id": "2031", "Teacher_Name": "HON’BLE VC SIR", "slotdata": "TCS604  LT302", "_id": "6635d77e56b1b1ca8d25085e" },
//             "02-03": { "class_id": "1", "Teacher_Name": "MR AMRISH", "slotdata": "A.I.LAB  ULI", "_id": "6635d77e56b1b1ca8d25085f" },
//             "03-04": { "class_id": "1", "Teacher_Name": "MR AMRISH", "slotdata": "A.I.LAB  ULI", "_id": "6635d77e56b1b1ca8d250860" },
//             "_id": "6635d77e56b1b1ca8d250861"
//         },
//         "wed": {
//             "08-09": { "class_id": "1041", "Teacher_Name": "MR PIYUSH", "slotdata": "TCS693  LT201", "_id": "6635d77e56b1b1ca8d250862" },
//             "11-12": { "class_id": "1031", "Teacher_Name": "MR AKSHAY RAJPUT", "slotdata": "Placement Class  LT202", "_id": "6635d77e56b1b1ca8d250863" },
//             "12-01": { "class_id": "1031", "Teacher_Name": "MR AKSHAY RAJPUT", "slotdata": "Placement Class  LT202", "_id": "6635d77e56b1b1ca8d250864" },
//             "02-03": { "class_id": "69", "Teacher_Name": "MR PIYUSH", "slotdata": "PCS693  LAB1", "_id": "6635d77e56b1b1ca8d250865" },
//             "04-05": { "class_id": "2031", "Teacher_Name": "DR DEVESH P. SINGH", "slotdata": "TCS601  LT302", "_id": "6635d77e56b1b1ca8d250866" },
//             "_id": "6635d77e56b1b1ca8d250867"
//         },
//         "thu": {
//             "09-10": { "class_id": "2041", "Teacher_Name": "MR PIYUSH", "slotdata": "TCS693  LT301", "_id": "6635d77e56b1b1ca8d250868" },
//             "10-11": { "class_id": "33", "Teacher_Name": "MS NEELAM", "slotdata": "PXCS601  Bosch lab", "_id": "6635d77e56b1b1ca8d250869" },
//             "11-12": { "class_id": "33", "Teacher_Name": "MS NEELAM", "slotdata": "PXCS601  Bosch lab", "_id": "6635d77e56b1b1ca8d25086a" },
//             "_id": "6635d77e56b1b1ca8d25086b"
//         },
//         "fri": {
//             "08-09": { "class_id": "2069", "Teacher_Name": "MS SONAL", "slotdata": "PCS601  LAB3", "_id": "6635d77e56b1b1ca8d25086c" },
//             "09-10": { "class_id": "2069", "Teacher_Name": "MS SONAL", "slotdata": "PCS601  LAB3", "_id": "6635d77e56b1b1ca8d25086d" },
//             "12-01": { "class_id": "2031", "Teacher_Name": "DR DEVESH P. SINGH", "slotdata": "TCS601  LT302", "_id": "6635d77e56b1b1ca8d25086e" },
//             "01-02": { "class_id": "2031", "Teacher_Name": "DR DEVESH P. SINGH", "slotdata": "TCS601      LT302", "_id": "6635d77e56b1b1ca8d25086f" },
//             "_id": "6635d77e56b1b1ca8d250870"
//         },
//         "_id": "6635d77e56b1b1ca8d250871"
//     }
// }

const letmesee2 = (temp_obj) => {
    for (let i = 1; i <= 7; i++) {
        let currrow = document.getElementById("mytable").rows[i].cells[0].innerHTML.toLowerCase();
        for (let j = 1; j <= 10; j++) {
            let currcol = document.getElementById("mytable").rows[0].cells[j].innerHTML.toLowerCase();
            if (temp_obj && temp_obj.schedule && temp_obj.schedule[currrow] && temp_obj.schedule[currrow][currcol] && temp_obj.schedule[currrow][currcol].Teacher_Name) {
                document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-danger text-white heading-text border");
                document.getElementById("mytable").rows[i].cells[j].innerHTML = temp_obj.schedule[currrow][currcol].slotdata;
            }
            else {
                document.getElementById("mytable").rows[i].cells[j].setAttribute("class", "text bg-primary text-white heading-text border");
                // document.getElementById("mytable").rows[i].cells[j].innerHTML = `<img height="50px" src="https://cdn.dribbble.com/users/1443748/screenshots/10868115/perry.jpg">`;

            }
        }
    }
};
// letmesee2(temp_obj)

const letmeseeitbaby = () => {
    let course = document.getElementById("course_option").value;
    let semester = document.getElementById("semester_option").value;
    let section = document.getElementById("section_option").value;


    // let queryString = `?course=${course}&semester=${semester}&section=${section}`;  // Constructing the query string
    // console.log("Request URL: http://127.0.0.1:3000/table/get-timetable" + queryString);    // Logging the constructed query string

    // Sending the GET request
    fetch('http://127.0.0.1:3000/table/get-timetable?' + new URLSearchParams({ course: course, semester: semester, section: section }), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            temp_obj = data;        // Do something with the response data here 
            console.log(data);
            letmesee2(data);
        })
        .catch(error => console.error('Data unavailable:', error));
}
letmeseeitbaby()

document.getElementById('letmesee').addEventListener('click', letmeseeitbaby);

