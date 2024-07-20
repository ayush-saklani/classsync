// courses = id : name
const options = {
    "arr": ["08","12"],              // bus arrival time
    "dep": ["01","04","06"],         // bus departure time
    "curr_term": "even",             // current term (odd/even)
    "courses": [
        { "btechcse": "BTech CSE" },
        { "btechme": "BTech ME" },
        { "bca": "BCA" },
        { "mca": "MCA" }
    ],
    "btechcse": {
        "total_sem": 8,
        "sections": {
            "2": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
            "4": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
            "6": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
            "8": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"]
        }
    },
    "btechme": {
        "total_sem": 8,
        "sections": {
            "2": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            "4": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            "6": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            "8": ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
        }
    },
    "bca": {
        "total_sem": 6,
        "sections": {
            "2": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            "4": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            "6": ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
        }
    },
    "mca": {
        "total_sem": 6,
        "sections": {
            "2": ["A", "B", "C", "D", "E"],
            "4": ["A", "B", "C"],
            "6": ["A", "B", "C"]
        }
    }
};
const addDynamicCourseOptions = () => {
    return new Promise((resolve, reject) => {
        try {
            document.getElementById("course_option").innerHTML = "";
            for (let i = 0; i < options["courses"].length; i++) {
                document.getElementById("course_option").innerHTML +=
                    `<option value="${Object.keys(options["courses"][i])[0]}">${Object.values(options["courses"][i])[0]}</option>`;
            }
            document.getElementById("course_option").value = "btechcse";
            resolve();
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
}
const addDynamicSemesterOptions = () => {
    return new Promise((resolve, reject) => {
        try {
            document.getElementById("semester_option").innerHTML = "";
            let currcourse = document.getElementById("course_option").value;
            if (options[currcourse]) {
                let firstsem = options["curr_term"] == "odd" ? 1 : 2;
                for (let i = firstsem; i <= options[currcourse].total_sem; i = i + 2) {
                    // console.log(i);
                    document.getElementById("semester_option").innerHTML +=
                        `<option value="${i}">${i}</option>`;
                }
                document.getElementById("semester_option").value = firstsem;
            }
            resolve();
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
const addDynamicSectionOptions = () => {
    return new Promise((resolve, reject) => {
        try {
            document.getElementById("section_option").innerHTML = "";
            let currcourse = document.getElementById("course_option").value;
            let currsem = document.getElementById("semester_option").value;
            if (options[currcourse].sections[currsem]) {
                for (let i = 0; i < options[currcourse].sections[currsem].length; i++) {
                    document.getElementById("section_option").innerHTML +=
                        `<option value="${options[currcourse].sections[currsem][i]}">${options[currcourse].sections[currsem][i]}</option>`;
                }
            }
            resolve();
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
document.addEventListener("DOMContentLoaded", async () => {
    addDynamicCourseOptions();
    await addDynamicSemesterOptions();
    await addDynamicSectionOptions();
});
document.getElementById("course_option").addEventListener("change", async () => {
    await addDynamicSemesterOptions();
    await addDynamicSectionOptions();
});
document.getElementById("semester_option").addEventListener("change", async () => {
    await addDynamicSectionOptions();
});