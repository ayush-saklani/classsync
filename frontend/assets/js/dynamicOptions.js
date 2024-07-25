const options = {
    "arr": ["08", "12"],                // bus arrival time
    "dep": ["01", "04", "06"],          // bus departure time
    "curr_term": "odd",                // current term (odd/even)
    "courses": [
        {
            "course_id": "btechcse",
            "course_name": "BTech CSE",
            "total_sem": 8,
            "sections": {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "3": ["A1","A2","B1","B2","C1","C2","D1","D2","E1","E2","F1","F2","G1","G2","H1","H2","I1","I2","J1","J2","K1","K2","L1","L2"],
                "5": ["A1","A2","B1","B2","C1","C2","D1","D2","E1","E2","F1","F2","G1","G2","H1","H2","I1","J1","J2","K1","K2","L1","L2","S"],
                "7": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"]
            }
        },
        {
            "course_id": "btechcseintegrated",
            "course_name": "BTech CSE Integrated",
            "total_sem": 12,
            "sections": {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "3": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "5": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "7": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "9": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "11": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
            }
        },
        {
            "course_id": "diplomacse",
            "course_name": "Diploma (CSE)",
            "total_sem": 6,
            "sections": {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "3": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "5": ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
            }
        },
        {
            "course_id": "btechme",
            "course_name": "BTech ME",
            "total_sem": 8,
            "sections": {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "3": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "5": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "7": ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
            }
        },
        {
            "course_id": "bca",
            "course_name": "BCA",
            "total_sem": 6,
            "sections": {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "3": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "5": ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
            }
        },
        {
            "course_id": "mca",
            "course_name": "MCA",
            "total_sem": 6,
            "sections": {
                "1": ["A", "B", "C", "D", "E"],
                "3": ["A", "B", "C"],
                "5": ["A", "B", "C"]
            }
        }
    ]
};
const addDynamicCourseOptions = () => {                 // add courses to course_option
    return new Promise((resolve, reject) => {
        try {
            document.getElementById("course_option").innerHTML = "";
            for (let i = 0; i < options["courses"].length; i++) {
                document.getElementById("course_option").innerHTML +=
                    `<option value="${options["courses"][i].course_id}">${options["courses"][i].course_name}</option>`;
            }
            // document.getElementById("course_option").value = "btechcse";
            resolve();
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
}
const addDynamicSemesterOptions = () => {               // add semesters to semester_option
    return new Promise((resolve, reject) => {
        try {
            document.getElementById("semester_option").innerHTML = "";
            let currcourse = document.getElementById("course_option").value;
            options.courses.forEach((course) => {
                if (course.course_id == currcourse) {
                    let firstsem = options["curr_term"] == "odd" ? 1 : 2;
                    for (let i = firstsem; i <= course.total_sem; i = i + 2) {
                        document.getElementById("semester_option").innerHTML +=
                            `<option value="${i}">${i}</option>`;
                    }
                    // document.getElementById("semester_option").value = firstsem;
                }
            });
            resolve();
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
const addDynamicSectionOptions = () => {                // add sections to section_option
    return new Promise((resolve, reject) => {
        try {
            document.getElementById("section_option").innerHTML = "";
            let currcourse = document.getElementById("course_option").value;
            let currsem = document.getElementById("semester_option").value;
            options.courses.forEach((course) => {
                if (course.course_id == currcourse) {
                    // console.log(course.sections[currsem]);
                    let sectionlist = course.sections[currsem];
                    for (let i = 0; i < sectionlist.length; i++) {
                        let sectionlistval = sectionlist[i];
                        document.getElementById("section_option").innerHTML +=
                            `<option value="${sectionlistval}">${sectionlistval}</option>`;
                    }
                }
            });
            // document.getElementById("section_option").value = "A";
            resolve();
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
document.addEventListener("DOMContentLoaded", async () => {
    if(document.getElementById("course_option")) {
        console.log("course_option found");
        addDynamicCourseOptions();
        if(document.getElementById("semester_option")){
            console.log("semester_option found");
            await addDynamicSemesterOptions();
            if(document.getElementById("section_option")){
                console.log("section_option found");
                await addDynamicSectionOptions();
            }
        }
    }
});
if(document.getElementById("course_option")){
    document.getElementById("course_option").addEventListener("change", async () => {
        console.log("semester_option found");
        await addDynamicSemesterOptions();
        if(document.getElementById("section_option")) {
            console.log("section_option found");
            await addDynamicSectionOptions();
        }
    });
}
if(document.getElementById("semester_option")){
    document.getElementById("semester_option").addEventListener("change", async () => {
        if(document.getElementById("section_option")) {   
            console.log("section_option found");
            await addDynamicSectionOptions();
        }
    });
}