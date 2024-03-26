import json

from class_to_id_dict import class_to_id

with open("./output-page-1-table-1.json", "r") as file:
    class_data = json.load(file)

with open("./output-page-1-table-2.json", "r") as file:
    faculty_data = json.load(file)

# Create a dictionary to store the structured data
structured_data = []
subject_to_faculty_dict = {}

for faculty in faculty_data[1:]:
    subject_to_faculty_dict[faculty["0"]] = faculty[
        "2"
    ]  # 0 index has subject code and 2 has faculty name

# Extract the header row
header = class_data[0]
hours = dict(list(header.items())[1:])  # Ignore the first column (DAY)

# Process each day's schedule
for day_data in class_data[1:]:
    day = day_data["0"]
    day_data = dict(list(day_data.items())[1:])
    for hour, subject in zip(hours, day_data.values()):
        subjectList = subject.split("\n")
        class_room = subjectList[-1]
        subject_code = subjectList[0].strip()
        print(subject_code)
        if subject.strip():  # Ignore empty cells
            structured_data.append(
                {
                    "Teacher_Name": subject_to_faculty_dict[subject_code],
                    "class_id": class_to_id[class_room],
                    "day": day.lower(),
                    "slot": hours[hour].strip().replace("\n", ""),
                    "slotdata": subject.strip().replace(
                        "\n", " "
                    ),  # Remove line breaks
                }
            )


with open("structured_timetable.json", "w") as f:
    json.dump(structured_data, f, indent=4)
