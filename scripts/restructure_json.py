import json
import re

from class_to_id_dict import class_to_id


def restructure_hour(hour):
    hour = re.sub(r"[\n ]", "", hour)
    hours = hour.split("-")

    for i in range(2):
        hours[i] = str(round(float(hours[i])) % 12)
        if hours[i] == "0":
            hours[i] = "12"
        if len(hours[i]) == 1:
            hours[i] = "0" + hours[i]

    return "-".join(hours)


with open("./raw_output.json", "r") as file:
    raw_data = json.load(file)

class_data = raw_data[1]["timetable"]

faculty_data = raw_data[2]["facultytable"]

course_details = raw_data[0]

# Create a dictionary to store the structured data
structured_data = {}
structured_data["course"] = course_details["course_name"]
structured_data["semester"] = course_details["semester"]
structured_data["section"] = course_details["section"]
subject_to_faculty_dict = {}

for faculty in faculty_data[1:]:
    subject_to_faculty_dict[faculty[0]] = faculty[
        2
    ]  # 0 index has subject code and 2 has faculty name

# Extract the header row
header = class_data[0]
hours = header[1:]  # Ignore the first column (DAY)

daywise_json = {}
# Process each day's schedule
for day_data in class_data[1:]:
    day = day_data[0].lower()
    daywise_json[day] = {}
    day_data = day_data[1:]
    for hour, subject in zip(hours, day_data):
        hour = restructure_hour(hour)
        subjectList = subject.split("\n")
        room = subjectList[-1]
        subject_code = subjectList[0].strip()
        slot = hour
        if subject.strip():  # Ignore empty cells
            daywise_json[day][slot] = {
                "class_id": class_to_id[room],
                "Teacher_Name": subject_to_faculty_dict[subject_code],
                "slotdata": subject.strip().replace("\n", " "),  # Remove line breaks
            }

structured_data["schedule"] = daywise_json

with open("structured_timetable.json", "w") as f:
    json.dump(structured_data, f, indent=4)
