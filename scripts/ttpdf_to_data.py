import json

import camelot
import pypdfium2

roman_to_int = {
    "I": "1",
    "II": "2",
    "III": "3",
    "IV": "4",
    "V": "5",
    "VI": "6",
    "VII": "7",
    "VIII": "8",
}


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
        course_name = "btechcse"
        semester = None
        section = None

        for line in text.splitlines():
            if "SEMESTER" in line:
                semester_section = line.split(":")[1].strip().split(" ")[:2]
                semester = roman_to_int[semester_section[0]]
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
course_details = extract_course_info(source_pdf_path)

tables = camelot.read_pdf(filepath=source_pdf_path)

timetable = {"timetable": tables[0].data}
facultytable = {"facultytable": tables[1].data}
schedule = {"timetable": tables[0].data, "facultytable": tables[1].data}

output_data = []

output_data.append(course_details)
output_data.append(timetable)
output_data.append(facultytable)


with open("raw_output.json", "w") as output_file:
    json.dump(output_data, output_file, indent=4)
