const fs = require('fs');
let classData,classSchedules;
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
            save_JSON();
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
    console.log("Reconstructed JSON:", reconstructedJson);
    fs.writeFile('reconstructed_ex.json', reconstructedJson, 'utf8', err => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        } else {
            console.log("File saved.");
        }
    });
}
load_JSON();
save_JSON();
// fs.readFile('ex.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error("Error reading file:", err);
//         return;
//     }
//     try {
//         classData = JSON.parse(data);
//         // Create a map to store class schedules
//         classSchedules = {};
//         // Iterate through the class data
//         classData.forEach(classObj => {
//             const classId = classObj.class_id;
//             const schedule = classObj.schedule;
//             // Store the schedule in the map using class ID as the key
//             classSchedules[classId] = schedule;
//         });
        

//         // Reconstructing class data array
//         const reconstructedClassData = Object.keys(classSchedules).map(classId => ({
//             class_id: classId,
//             schedule: classSchedules[classId]
//         }));
//         // Stringify the reconstructed class data array
//         const reconstructedJson = JSON.stringify(reconstructedClassData, null, 2);
//         console.log("Reconstructed JSON:", reconstructedJson);
//         // Write the reconstructed JSON to a file
//         fs.writeFile('reconstructed_ex.json', reconstructedJson, 'utf8', err => {
//             if (err) {
//                 console.error("Error writing file:", err);
//             } else {
//                 console.log("File 'reconstructed_ex.json' has been saved.");
//             }
//         });
//     } catch (error) {
//         console.error("Error parsing JSON:", error);
//     }
// });
// Accessing schedule for a class by its ID


// const classId = "A101";

// const scheduleForA101 = classSchedules[classId];
// console.log("Schedule for class A101:", scheduleForA101);
// classSchedules["A101"]["mon"]["08-09"]["teacher_ID"] = 1; 


