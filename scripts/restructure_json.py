import json

from class_to_id_dict import class_to_id

with open("./raw_output.json", "r") as file:
    raw_data = json.load(file)

class_data = raw_data[1]["timetable"]

faculty_data = raw_data[2]["facultytable"]

course_details = raw_data[0]

# Create a dictionary to store the structured data
structured_data = []
subject_to_faculty_dict = {}

for faculty in faculty_data[1:]:
    subject_to_faculty_dict[faculty[0]] = faculty[
        2
    ]  # 0 index has subject code and 2 has faculty name

# Extract the header row
header = class_data[0]
hours = header[1:]  # Ignore the first column (DAY)

# Process each day's schedule
for day_data in class_data[1:]:
    day = day_data[0]
    day_data = day_data[1:]
    for hour, subject in zip(hours, day_data):
        subjectList = subject.split("\n")
        class_room = subjectList[-1]
        subject_code = subjectList[0].strip()
        if subject.strip():  # Ignore empty cells
            structured_data.append(
                {
                    "class_id": class_to_id[class_room],
                    "Teacher_Name": subject_to_faculty_dict[subject_code],
                    "day": day.lower(),
                    "slot": hour.strip().replace("\n", "").replace(" ", ""),
                    "course": course_details["course_name"],
                    "semester": course_details["semester"],
                    "section": course_details["section"],
                    "slotdata": subject.strip().replace(
                        "\n", " "
                    ),  # Remove line breaks
                }
            )


with open("structured_timetable.json", "w") as f:
    json.dump(structured_data, f, indent=4)
