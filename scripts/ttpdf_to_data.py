import camelot

tables = camelot.read_pdf(filepath="../asset/docs/timetable project.pdf")
tables.export("output.json", f="json")
# tables.to_json("foo.json")
print(tables)
