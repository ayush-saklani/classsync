let faculty_data;
let room_list;
let messageCounter = 0;

const update_faculty_list = () => {		    // updates the faculty list to the server
    // document.getElementById("loader").style.display = "flex";
    fetch(`${localhost}/faculty/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "facultyList": faculty_data })
    }).then(response => {
        response.json()
    }).then(() => {
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 2000);
        float_error_card_func('Faculty Data Reset Complete', '', 'success');
    }).catch(error => {
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 2000);
        float_error_card_func('Faculty Data Reset Incomplete<br>Server Error', '', 'danger');
        console.error('Faculty Data Not Updated [ SERVER ERROR ] :::: ', error)
    });
};
const fetch_faculties_list = () => {		// fetches the faculty list from the server and do the operations
    document.getElementById("loader").style.display = "flex";
    fetch(`${localhost}/faculty/getall`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            data = data.data;
            console.log(data);
            faculty_data = data;
        }).then(() => {
            // to reset the data of the faculty
            // this is because the loop method will be much slower and save computation power as this scales
            for (faculty in faculty_data) {
                faculty_data[faculty].schedule = {
                    "mon": {
                        "08-09": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                    },
                    "tue": {
                        "08-09": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                    },
                    "wed": {
                        "08-09": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                    },
                    "thu": {
                        "08-09": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                    },
                    "fri": {
                        "08-09": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                    },
                    "sat": {
                        "08-09": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                    },
                    "sun": {
                        "08-09": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "roomid": [], "subjectcode": "" },
                    }
                }
            }
            console.log(faculty_data);
        })
        .then(() => {
            update_faculty_list();
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 2000);
            float_error_card_func('Faculty Data Fetched Successfully', '', 'success');
        }).catch(error => {
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 2000);
            float_error_card_func('Faculty Data Not Found<br>Server Error', '', 'danger');
            console.error('Faculty Data not available [ SERVER ERROR ] :::: ', error)
        });
};

const reset_room_occupancy_data = () => {   // this function resets the room data to the server
    fetch(`${localhost}/list/save-list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "type": "rooms",
            "data": room_list
        })
    }).then(response => {
        if (response.ok) {
            float_error_card_func("Room Data Reset Complete", "", "success");
            return response.json();
        } else {
            throw new Error(':::::  DATA NOT SAVED DUE TO NETWORK ERROR :::::');
        }
    }).catch(error => {
        float_error_card_func("Room Data Reset Incomplete<br>Server Error", "", "danger");
        console.error('Room Data not Set [ SERVER ERROR ] :::: ', error);
    });
}
const fetch_room_list = () => {             //  this function fetches the room list data form the server 	
    return fetch(`${localhost}/list/get-list?type=rooms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            float_error_card_func('Room Data Fetched Successfully', '', 'success');
            room_list = data.data.data;
        }).then(() => {
            console.log(room_list);
        }).then(() => {
            for (room in room_list) {
                room_list[room].schedule = {
                    "mon": {
                        "08-09": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" }
                    },
                    "tue": {
                        "08-09": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" }
                    },
                    "wed": {
                        "08-09": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" }
                    },
                    "thu": {
                        "08-09": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" }
                    },
                    "fri": {
                        "08-09": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" }
                    },
                    "sat": {
                        "08-09": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" }
                    },
                    "sun": {
                        "08-09": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "09-10": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "10-11": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "11-12": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "12-01": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "01-02": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "02-03": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "03-04": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "04-05": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" },
                        "05-06": { "course": "", "semester": "", "section": [], "teacherid": "", "subjectcode": "" }
                    }
                }
            }
        })
        .then(() => {
            reset_room_occupancy_data();
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 2000);
        })
        .catch(error => (
            float_error_card_func('Room Data not available<br>Server Error', '', 'danger'),
            console.error('Room Data not available [ SERVER ERROR ] :::: ', error)
        ));
};
const delete_room_data = () => {            //  this function Deletes the room data from the server 	
    document.getElementById("loader").style.display = "flex";
    fetch(`${localhost}/room/removeall`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('accessToken')}`
        }
    }).then(response => response.json())
    .then(data => {
        if(data.success){
            float_error_card_func('Room Data Deleted Successfully', '', 'success');
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 2000);
        }
        else{
            throw new Error(`:::::  DATA NOT DELETED ${data.message} :::::`);
        }
    })
    .catch(error => (
        float_error_card_func('Room Data not Deleted<br>Server Error', '', 'danger'),
        console.error('Room Data not Deleted [ SERVER ERROR ] :::: ', error)
    ));
};

//////////////////////////  NOT IMPLEMENTED YET  //////////////////////////
//////////////////////  API ENDPOINT NOT AVAILABLE  //////////////////////
const remove_timetable_data = () => {
}
//////////////////////////  NOT IMPLEMENTED YET  //////////////////////////
const confirm_2times = (message1,callbackfunc) => {         // this function is used to confirm the action twice (not implemented yet)
    if(window.confirm(message1)){
        if(window.confirm('This action is irreversible. Are you sure you want to continue?')){
            callbackfunc();
        }
    }
}
document.getElementById('reset_faculty_data_button').addEventListener('click', ()=>{
    if(window.confirm('Are you sure you want to reset the faculty data?')){
        if(window.confirm('This action is irreversible. Are you sure you want to continue?')){
            fetch_faculties_list()
        }
    }
});
document.getElementById('reset_room_occupancy_data_button').addEventListener('click', ()=>{
    if(window.confirm('Are you sure you want to reset the room data?')){
        if(window.confirm('This action is irreversible. Are you sure you want to continue?')){
            fetch_room_list()
        }
    }
});
document.getElementById('remove_room_data_button').addEventListener('click', ()=>{
    if(window.confirm('Are you sure you want to Delete the room data?')){
        if(window.confirm('This action is irreversible. Are you sure you want to continue?')){
            delete_room_data()
        }
    }
});
// document.getElementById('remove_timetable_data').addEventListener('click', remove_timetable_data_button);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 2000);
});