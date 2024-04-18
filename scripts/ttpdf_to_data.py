import json

import camelot
import pypdfium2


def extract_course_info(pdf_path):
    """
    Extracts course name and section from a PDF timetable page.

    Args:
      pdf_path: Path to the PDF file.

    Returns:
      A dictionary containing course name and section, or None if not found.
    """
    with open(pdf_path, "rb") as pdf_file:
        doc = pypdfium2.PdfDocument(pdf_file)

        # Extract text from the first page
        page = doc[0]
        text = page.get_textpage().get_text_range()

        # Look for lines containing "COURSE NAME" and "SECTION"
        course_name = None
        semester = None
        section = None

        for line in text.splitlines():
            if "COURSE NAME" in line:
                course_name = line.split(":")[1].strip()
            elif "SEMESTER" in line:
                semester_section = line.split(":")[1].strip().split(" ")[:2]
                semester = semester_section[0]
                section = semester_section[1]

        # Check if both course name and section are found
        if course_name and semester and section:
            return {
                "course_name": course_name,
                "semester": semester,
                "section": section,
            }
        else:
            return None


source_pdf_path = "../asset/docs/timetable project.pdf"
output_data = {"courses": {}}
course_details = extract_course_info(source_pdf_path)

tables = camelot.read_pdf(filepath=source_pdf_path)

schedule = {"timetable": tables[0].data, "facultytable": tables[1].data}


output_data["courses"][course_details["course_name"]] = {
    course_details["semester"]: {course_details["section"]: schedule},
}

# output strucutre:-
#     courses : {
#         course_name: {
#             semester:{
#                     section:{
#                         timetable(list),facultytable(list)
#             }
#         }
#     }
# }

with open("raw_output.json", "w") as output_file:
    json.dump(output_data, output_file, indent=4)
