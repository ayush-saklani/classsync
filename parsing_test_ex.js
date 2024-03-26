const fs = require('fs');
let classSchedules;
function load_JSON(){
    fs.readFile('scripts/ex.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        try {
            let classData = JSON.parse(data);
            // Create a map to store class schedules
            classSchedules = {};
            // Iterate through the class data
            classData.forEach(classObj => {
                const classId = classObj.class_id;
                const schedule = classObj.schedule;
                // Store the schedule in the map using class ID as the key
                classSchedules[classId] = schedule;
            });
            // load_changes()
            // save_JSON();
            fetching_timetable("btech",6,"a");
        }catch (error) {
            console.error("Error parsing JSON:", error);
        }
    });
}
function save_JSON(){
    const reconstructedClassData = [];
    for (const classId in classSchedules) {
        reconstructedClassData.push({ class_id: classId, schedule: classSchedules[classId] });
    }
    const reconstructedJson = JSON.stringify(reconstructedClassData, null, 2);
    // console.log("Reconstructed JSON:", reconstructedJson);
    fs.writeFile('scripts/reconstructed_ex.json', reconstructedJson, 'utf8', err => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        } else {
            console.log("File saved.");
        }
    });
}
function load_changes(){ // load data from ex2.json and save it to ex.json
    fs.readFile('scripts/ex2.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        try {
            let tempdata = JSON.parse(data);
            // Iterate through the class data
            tempdata.forEach(classObj => {
                const classid = classObj.class_id;
                const teacherid = classObj.teacher_ID;
                const day = classObj.day;
                const slot = classObj.slot;
                const course = classObj.course;
                const section = classObj.section;
                const semester = classObj.semester;
                const slotdata = classObj.slotdata;
                classSchedules[classid][day][slot] = { "course":course,"section":section,"semester":semester,"slotdata": slotdata, "teacher_ID": teacherid };
                console.log("done ");
            }); 
            save_JSON();
        }catch (error) {
            console.error("Error parsing JSON:", error);
        }
    });
}
function fetching_timetable(qcourse,qsemester,qsection){
    for (const classid in classSchedules) {
        if (classSchedules.hasOwnProperty(classid)) {
            const local_schedule = classSchedules[classid];
            for (const day in local_schedule) {
                if (local_schedule.hasOwnProperty(day)) {
                    const slots = local_schedule[day];
                    for (const slot in slots) {
                        if (slots.hasOwnProperty(slot)) {
                            if(slots[slot].course == qcourse && slots[slot].semester == qsemester && slots[slot].section == qsection){
                                console.log(slot);
                            }
                        }
                    }
                }
            }
        }
    }
}

load_JSON();
