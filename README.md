# **Class-Sync Timetable manager (γ)** <img src="asset/image/logo.png" height="110" align="left"/>
**Designed and built with all the love and passion in the world by
<a class="link-danger" href="https://github.com/ayush-saklani"><b>ayush-saklani</b></a>
<b>X</b>
<a class="link-primary" href="https://github.com/RawatDevanshu"><b>RawatDevanshu</b></a>.
_( currently in finalization phase )_**

# **Language and Tools**

<div align="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"height="75"/>
<img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png"height="75"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Status_iucn_EX_icon_blank.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-plain.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="75"/>
</div>

# How to run this project
### **To start the Server**
- cd backend ***( From the root folder )***
- npm start ***( starts the server )***
### **To start the Frontend**
- Open in live server
- OR
- Open the `index.html` ***( home page )*** 

# Folder Structure

- **`asset`** folder to store logos, docs and extra files
- **`frontend`** HTML frontend
- **`backend`** NodeJS and MongoDB Backend
- **`frontend`** HTML frontend
- **`JSONS`** Data Structure used to store documents in DB
- **`README.md`** README.md

#
#

## Things to work and figure out right now
##  _( kuch idea ya kaam hoga to list kardena neeche and ping me )_

## Version 1.5
- [x] reset button
- [x] room validation
- [ ] seperate website for admin and students 
- [ ] resetting the code for new faculty data structure
- [ ] teacher validation
- [ ] relocating the assets and refactoring the website according to students , teacher and admin
- [ ] Deployment of code [backend + frontend]  
- [ ] collection or list for events and subject list.
- [ ] before entering the timetable for sections, subject allocation and fixation should be done beforehand else teacher data will be resetted.
 
 ___subject (list) will store the subject course and semester wise.___ 

___events will be stored date wise[date as a primary key to match] in a collection(collection preferred because we want to extract 7 days of upcoming events).___
## Version 1.8
- [ ] Login for students teacher and admin

## Version 2.0
- [ ] copy to side button ***[ jaise 2 hrs ki class hai tab on hover to copy data so the slot at right ] [ future feature ]***
- [ ] faculty exchange of teaching slot permanently and temporarily
- [ ] room ds change  
- [ ] college events handling and holiday flashes [ save event get 7 event and get all events delete and update events all required accordingly  ]