// import { parse } from "path";
// import { json } from "stream/consumers";
const fs = require('fs');

// data structure testing
// class classroom{
//     constructor(classid){
//         this.classid = classid; 
//         this.time_slot_test={
//             'mon': {
//                 '08-09': { class_status: 0, teacher_ID: 0 },  // 08-09    
//                 '09-10': { class_status: 0, teacher_ID: 0 },  // 09-10    
//                 '10-11': { class_status: 0, teacher_ID: 0 },  // 10-11    
//                 '11-12': { class_status: 0, teacher_ID: 0 },  // 11-12    
//                 '12-01': { class_status: 0, teacher_ID: 0 },  // 12-01    
//                 '01-02': { class_status: 0, teacher_ID: 0 },  // 01-02    
//                 '02-03': { class_status: 0, teacher_ID: 0 },  // 02-03    
//                 '03-04': { class_status: 0, teacher_ID: 0 },  // 03-04    
//                 '04-05': { class_status: 0, teacher_ID: 0 },  // 04-05    
//                 '05-06': { class_status: 0, teacher_ID: 0 }   // 05-06
//             },
//             'tue': {
//                 '08-09': { class_status: 0, teacher_ID: 0 },  // 08-09    
//                 '09-10': { class_status: 0, teacher_ID: 0 },  // 09-10    
//                 '10-11': { class_status: 0, teacher_ID: 0 },  // 10-11    
//                 '11-12': { class_status: 0, teacher_ID: 0 },  // 11-12    
//                 '12-01': { class_status: 0, teacher_ID: 0 },  // 12-01    
//                 '01-02': { class_status: 0, teacher_ID: 0 },  // 01-02    
//                 '02-03': { class_status: 0, teacher_ID: 0 },  // 02-03    
//                 '03-04': { class_status: 0, teacher_ID: 0 },  // 03-04    
//                 '04-05': { class_status: 0, teacher_ID: 0 },  // 04-05    
//                 '05-06': { class_status: 0, teacher_ID: 0 }   // 05-06
//             },
//             'wed': {
//                 '08-09': { class_status: 0, teacher_ID: 0 },  // 08-09    
//                 '09-10': { class_status: 0, teacher_ID: 0 },  // 09-10    
//                 '10-11': { class_status: 0, teacher_ID: 0 },  // 10-11    
//                 '11-12': { class_status: 0, teacher_ID: 0 },  // 11-12    
//                 '12-01': { class_status: 0, teacher_ID: 0 },  // 12-01    
//                 '01-02': { class_status: 0, teacher_ID: 0 },  // 01-02    
//                 '02-03': { class_status: 0, teacher_ID: 0 },  // 02-03    
//                 '03-04': { class_status: 0, teacher_ID: 0 },  // 03-04    
//                 '04-05': { class_status: 0, teacher_ID: 0 },  // 04-05    
//                 '05-06': { class_status: 0, teacher_ID: 0 }   // 05-06
//             },
//             'thu': {
//                 '08-09': { class_status: 0, teacher_ID: 0 },  // 08-09    
//                 '09-10': { class_status: 0, teacher_ID: 0 },  // 09-10    
//                 '10-11': { class_status: 0, teacher_ID: 0 },  // 10-11    
//                 '11-12': { class_status: 0, teacher_ID: 0 },  // 11-12    
//                 '12-01': { class_status: 0, teacher_ID: 0 },  // 12-01    
//                 '01-02': { class_status: 0, teacher_ID: 0 },  // 01-02    
//                 '02-03': { class_status: 0, teacher_ID: 0 },  // 02-03    
//                 '03-04': { class_status: 0, teacher_ID: 0 },  // 03-04    
//                 '04-05': { class_status: 0, teacher_ID: 0 },  // 04-05    
//                 '05-06': { class_status: 0, teacher_ID: 0 }   // 05-06
//             },
//             'fri': {
//                 '08-09': { class_status: 0, teacher_ID: 0 },  // 08-09    
//                 '09-10': { class_status: 0, teacher_ID: 0 },  // 09-10    
//                 '10-11': { class_status: 0, teacher_ID: 0 },  // 10-11    
//                 '11-12': { class_status: 0, teacher_ID: 0 },  // 11-12    
//                 '12-01': { class_status: 0, teacher_ID: 0 },  // 12-01    
//                 '01-02': { class_status: 0, teacher_ID: 0 },  // 01-02    
//                 '02-03': { class_status: 0, teacher_ID: 0 },  // 02-03    
//                 '03-04': { class_status: 0, teacher_ID: 0 },  // 03-04    
//                 '04-05': { class_status: 0, teacher_ID: 0 },  // 04-05    
//                 '05-06': { class_status: 0, teacher_ID: 0 }   // 05-06
//             },
//             'sat': {
//                 '08-09': { class_status: 0, teacher_ID: 0 },  // 08-09    
//                 '09-10': { class_status: 0, teacher_ID: 0 },  // 09-10    
//                 '10-11': { class_status: 0, teacher_ID: 0 },  // 10-11    
//                 '11-12': { class_status: 0, teacher_ID: 0 },  // 11-12    
//                 '12-01': { class_status: 0, teacher_ID: 0 },  // 12-01    
//                 '01-02': { class_status: 0, teacher_ID: 0 },  // 01-02    
//                 '02-03': { class_status: 0, teacher_ID: 0 },  // 02-03    
//                 '03-04': { class_status: 0, teacher_ID: 0 },  // 03-04    
//                 '04-05': { class_status: 0, teacher_ID: 0 },  // 04-05    
//                 '05-06': { class_status: 0, teacher_ID: 0 }   // 05-06
//             },
//             'sun': {
//                 '08-09': { class_status: 0, teacher_ID: 0 },  // 08-09    
//                 '09-10': { class_status: 0, teacher_ID: 0 },  // 09-10    
//                 '10-11': { class_status: 0, teacher_ID: 0 },  // 10-11    
//                 '11-12': { class_status: 0, teacher_ID: 0 },  // 11-12    
//                 '12-01': { class_status: 0, teacher_ID: 0 },  // 12-01    
//                 '01-02': { class_status: 0, teacher_ID: 0 },  // 01-02    
//                 '02-03': { class_status: 0, teacher_ID: 0 },  // 02-03    
//                 '03-04': { class_status: 0, teacher_ID: 0 },  // 03-04    
//                 '04-05': { class_status: 0, teacher_ID: 0 },  // 04-05    
//                 '05-06': { class_status: 0, teacher_ID: 0 }   // 05-06
//             }
//         }    
//     }
// }
// let name = 'cr101'
// let cr101 = new classroom(); // cr101
// let cr102 = new classroom(); // cr101

// cr101.time_slot_test.mon["01-02"].class_status = true
// console.log(cr101.time_slot_test.mon["01-02"].class_status);

let classInstances;
fs.readFile('ex.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    try {
        // Parse JSON data
        classInstances = JSON.parse(data);

        // Access each class instance
        // classInstances.forEach(instance => {
        //     console.log("Class ID:", instance.class_id);
        //     console.log("Teacher ID:", instance['schedule']);
        //     console.log("Day:", instance.day);
        //     console.log("Slot:", instance.slot);
        //     console.log("Slot Data:", instance.slotdata);
        //     console.log("---------------------------------------");
        // });
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
});
// console.log("Teacher ID:", classInstances["A101"]['schedule']['mon']);
console.log(classInstances.size);
