# **Class-Sync Timetable manager (v1.5)** <img src="assets/image/logo.png" height="110" align="left"/>

**Designed and built with all the love and passion in the world by
<a class="link-danger" href="https://github.com/ayush-saklani"><b>ayush-saklani</b></a>
<b>X</b>
<a class="link-primary" href="https://github.com/RawatDevanshu"><b>RawatDevanshu</b></a>.
_( currently in finalization phase )_**

## File Structure

```
frontend
├───assets
│   ├───image       ---------------Global image assets
│   ├───js       ------------------Global JS files
│   └───css       -----------------Global CSS File
├───edit
│   ├───faculty-data-editor       -Edit Faculty Data (add/remove faculty)
│   ├───faculty-data-set       ----Set Faculty Data for diffrent Sections
│   ├───subject-data-editor       -Set Subject Data (Syllabus) for Semesters
│   ├───timetable-editor       ----Main :: Timetable Editor or Timetable Maker
│   ├───misc       ----------------Miscellanious Support functions
│   └───reset       ---------------Reset :: Reset Database
├───view
│   ├───faculty       -------------Viewing page for faculty
│   ├───students       ------------Viewing page for Students
│   └───room       ----------------Viewing page for Room Occupancy
|
├───login       -------------------Handle Login and Cookie Setting
└───ztester       -----------------Contain files for testing future features
```
## Timetable Structure

<table align="center">
	<thead>
		<tr><th></th>
			<th>08-09</th>
			<th>09-10</th>
			<th>10-11</th>
			<th>11-12</th>
			<th>12-01</th>
			<th>01-02</th>
			<th>02-03</th>
			<th>03-04</th>
			<th>04-05</th>
			<th>05-06</th></tr>
	</thead>
	<tbody>
		<tr><th>MON</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>
		<tr><th>TUE</th><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
		<tr><th>WED</th><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
		<tr><th>THU</th><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
		<tr><th>FRI</th><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
		<tr><th>SAT</th><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
		<tr><th>SUN</th><td>7</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
	</tbody>
</table>

### Loop to Iterate this Table 

```
for (let i = 1; i <= 7; i++) {
	let currrow = document.getElementById("mytable").rows[i].cells[0].innerHTML.toLowerCase();

	for (let j = 1; j <= 10; j++) {
		let currcol = document.getElementById("mytable").rows[0].cells[j].innerHTML.toLowerCase();
	}
}
```