# **Class-Sync Timetable manager (v1.5)** <img src="frontend/assets/image/logo.png" height="110" align="left"/>
**Designed and built with all the love and passion in the world by
<a class="link-danger" href="https://github.com/ayush-saklani"><b>ayush-saklani</b></a>
<b>X</b>
<a class="link-primary" href="https://github.com/RawatDevanshu"><b>RawatDevanshu</b></a>.
_( currently in finalization phase )_**

# **Languages, Frameworks and Tools**
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<div align="left" style="margin: 10px;">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"height="75"/>
<img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png"height="75"/>
<svg viewBox="0 0 128 128" height="80px">
    <path d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z" fill="white" stroke="white" stroke-width="5"></path>
</svg>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-plain.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" height="75"/>
</div>

# How to run this project
### ⚠️ Warning - *Before entering the timetable for sections, subjects and teacher allocation and fixation  should be done beforehand else teacher data will be resetted and code might break.*
###  **Backend ( Server )** - in terminal `npm start` ***( starts the server )***
### **Frontend** - Open `frontend/index.html` ***( home page )*** 

#

##  _( Any idea, features, bugs or work in mind ??? list below and ping me )_
## ⭐ Ideas and features to work and figure out right now

## Version 1.0  ✅
- [x] Implement basic functionality for creating and managing timetables.
- [x] Add support for adding and editing subjects, teachers, and rooms.
- [x] Implementation of room validation.
- [x] Create separate interfaces for admin and students.
- [x] Data Structture design and Implementation
- [x] Basic API Design and Implementation.
- [x] UI Design and improvements.

## Version 1.5  ✅
- [x] reset button.
- [x] room validation improvement.
- [x] seperate website for admin and students.
- [x] resetting the code for new faculty data structure
- [x] Implementation of teacher validation.
- [x] relocating the assets and refactoring of website folders and routings.
- [x] collection for subject teacher list ___( common subject (list) will store the subject course and semester wise )___
- [x] Deployment of code ___[backend ( 50% ) + frontend].___
- [x] UI improvements.
 
## Version 1.8 *( under development )*
- [ ] Login for students teacher and admin

## Version 2.0 *( proposed )*
- [ ] copy to side button ***[ jaise 2 hrs ki class hai tab on hover to copy data so the slot at right ] [ future feature ]***
- [ ] Faculty exchange of teaching slot permanently and temporarily.
- [ ] Teacher absent status introduced.
- [ ] College events handling and holiday flashes [ save event get 7 event and get all events delete and update events all required accordingly  ]
- [ ] Collection for events.
___events will be stored date wise[date as a primary key to match] in a collection(collection preferred because we want to extract 7 days of upcoming events).___