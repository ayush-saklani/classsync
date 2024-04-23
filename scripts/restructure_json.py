import json

from room_to_id_dict import room_to_id


def fill_data_to_day_field(timetable_data, faculty_data):
    """
    Extracts daywise data for each section
    returns a dictionary
    """
    daywise_schedule_dict = {}
    subject_to_faculty_dict = {}

    for faculty in faculty_data[1:]:
        subject_to_faculty_dict[faculty[0]] = faculty[
            2
        ]  # 0 index has subject code and 2 has faculty name

    header = timetable_data[0]
    hours = header[1:]  # Ignore the first column (DAY)

    for day_data in timetable_data[1:]:
        day = day_data[0]
        day_data = day_data[1:]

        for hour, subject in zip(hours, day_data):
            subjectList = subject.split("\n")
            room = subjectList[-1]
            subject_code = subjectList[0].strip()

            if subject.strip():
                if not (day in daywise_schedule_dict):
                    daywise_schedule_dict[day] = []

                daywise_schedule_dict[day].append(
                    {
                        "room_id": room_to_id[room],
                        "Teacher_Name": subject_to_faculty_dict[subject_code],
                        "slot": hour.strip().replace("\n", "").replace(" ", ""),
                        "slotdata": subject.strip().replace("\n", " "),
                    }
                )
    return daywise_schedule_dict


structured_data = {"courses": {}}

with open("./raw_output.json", "r") as file:
    raw_data = json.load(file)

courses = raw_data["courses"]

# below loop nests the data in json
# and innermost loop fills daywise data for every section
for course in courses:
    course_data = courses[course]
    structured_data["courses"] = {course: {}}
    structured_courses = structured_data["courses"]
    for semester in course_data:
        semester_data = course_data[semester]
        structured_courses[course] = {semester: {}}
        structured_semesters = structured_courses[course]
        for section in semester_data:
            section_data = semester_data[section]
            timetable_data = section_data["timetable"]
            faculty_data = section_data["facultytable"]
            structured_sections = structured_semesters[semester]

            structured_sections[section] = fill_data_to_day_field(
                timetable_data, faculty_data
            )

with open("structured_timetable.json", "w") as f:
    json.dump(structured_data, f, indent=4)
