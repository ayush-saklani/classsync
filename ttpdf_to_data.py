import camelot

tables = camelot.read_pdf(pages='all',filepath='alltimetable.pdf')
tables.export('output.json', f='json',compress=True)
# tables.to_json('foo.json')
print(tables)
