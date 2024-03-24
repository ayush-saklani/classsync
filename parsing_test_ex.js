const fs = require('fs');
let classData,tempdata,classSchedules,tempSchedules;
function load_JSON(){
    fs.readFile('ex.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        try {
            classData = JSON.parse(data);
            // Create a map to store class schedules
            classSchedules = {};
            // Iterate through the class data
            classData.forEach(classObj => {
                const classId = classObj.class_id;
                const schedule = classObj.schedule;
                // Store the schedule in the map using class ID as the key
                classSchedules[classId] = schedule;
            });
            load_changes()
            // save_JSON();
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
    fs.writeFile('reconstructed_ex.json', reconstructedJson, 'utf8', err => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        } else {
            console.log("File saved.");
        }
    });
}
function load_changes(){ // load data from ex2.json and save it to ex.json
    fs.readFile('ex2.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        try {
            tempdata = JSON.parse(data);
            // Create a map to store class schedules
            tempSchedules = {};
            // Iterate through the class data
            tempdata.forEach(classObj => {
                const classid = classObj.class_id;
                const teacherid = classObj.teacher_ID;
                const day = classObj.day;
                const slot = classObj.slot;
                const slotdata = classObj.slotdata;
                classSchedules[classid][day][slot] = {"slotdata": slotdata, "teacher_ID": teacherid };
                console.log("done ");
            }); 
            save_JSON();
        }catch (error) {
            console.error("Error parsing JSON:", error);
        }
    });
}
load_JSON();
save_JSON();