import json

from class_to_id_dict import class_to_id

with open("./input_table1.json", "r") as file:
    data = json.load(file)

# Create a dictionary to store the structured data
structured_data = []

# Extract the header row
header = data[0]
hours = dict(list(header.items())[1:])  # Ignore the first column (DAY)

# Process each day's schedule
for day_data in data[1:]:
    day = day_data["0"]
    day_data = dict(list(day_data.items())[1:])
    for hour, subject in zip(hours, day_data.values()):
        print(subject.split(" ")[-1])
        if subject.strip():  # Ignore empty cells
            structured_data.append(
                {
                    "class_id": class_to_id["CR504"],
                    "day": day.lower(),
                    "slot": hours[hour].strip().replace("\n", ""),
                    "slotdata": subject.strip().replace(
                        "\n", " "
                    ),  # Remove line breaks
                }
            )


with open("structured_timetable.json", "w") as f:
    json.dump(structured_data, f, indent=4)
