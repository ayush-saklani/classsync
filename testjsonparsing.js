const fs = require('fs');

// Read the JSON file
fs.readFile('ex2.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    try {
        // Parse JSON data
        const classInstances = JSON.parse(data);

        // Access each class instance
        classInstances.forEach(instance => {
            console.log("Class ID:", instance.class_id);
            console.log("Teacher ID:", instance.teacher_ID);
            console.log("Day:", instance.day);
            console.log("Slot:", instance.slot);
            console.log("Slot Data:", instance.slotdata);
            console.log("---------------------------------------");
        });
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
});
// console.log("Teacher ID:", instance.schedule["mon"]);
//             console.log("Teacher ID:", instance.schedule["mon"]);
