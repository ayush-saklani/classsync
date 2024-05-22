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
#
#
#

## Things to work out right now _( kuch idea ya kaam hoga to list kardena neeche and ping me )_

- [x] **_1st api_** - (/table/post-teachertable)
      ~~post reqest to send the teacher subject relation data to the backend to save it to database~~
- [x] **_2nd API_** - (/table/get-timetable)
      ~~to fetch the same data through a GET API~~

~~_( idea being i will fetch the table when the page refreshes and if the data is there in the DB api will return the json and if not then not then we can edit the table according to our wish and phir post marunga **(1st api)** to save it this time )_~~
- [x] **_3rd API_** - (/list/get-rooms)
      ~~show the room list~~
- [x] **_4th API_** - (/list/get-faculties)
      ~~to fetch the teacher~~
      
~~_( i want these two seperate get APIs to return the data with no request params)_~~

# ==============================

# Well Well Well Devanshu I did it AGAIN !! 
# I have a new DS for Time-Table storage 
- i was working on techniques to load timetable when the page loads, i observed a huge mistake i did by seperating the subject-teacher relation table from the time table ***[ I will explain it when i meet you ]***
- But for the time being 

## This is the proposed new improved structure 
***[ slot data is a not an optional field ]***

		{
            "course" : "btechcse",
            "semester" : "6",
            "section" : "A",
            "schedule": {
                "mon": {
                    "08-09": { 
                        "class_id" : "55",
                        "subjectcode" : "XCS300", 
                        "slotdata" : "XCS300\nCR304"
                    },
                    "09-10": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "10-11": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "11-12": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "12-01": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "01-02": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "02-03": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "03-04": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "04-05": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "05-06": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  }
                },
                .
                .
                .
                .
                .
                .
                "sun": {
                    "08-09": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    .
                    .
                    .
                    .
                }
            },
            "teacher_subject_data":[
                {
                    "subjectcode" : "TCS601",
                    "teacherid" : "21184220",
                    "weekly_hrs" : "3",
                    "teachername" : "DR ANKIT TOMAR",
                    "subjectname" : "COMPILER DESIGN",
                    "theory_practical" : "THEORY"
                },
                {
                    "subjectcode" : "TCS602",
                    "teacherid" : "21184221",
                    "weekly_hrs" : "3",
                    "teachername" : "DR ANKITA TOMAR",
                    "subjectname" : "COMPILER DESIGN LAB",
                    "theory_practical" : "PRACTICAL"
                }
            ]
        }