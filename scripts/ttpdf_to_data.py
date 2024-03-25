import camelot

tables = camelot.read_pdf(filepath="../asset/docs/alltimetable.pdf")
tables.export("output.json", f="json")
# tables.to_json("foo.json")
print(tables)
