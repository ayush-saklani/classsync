# **Class-Sync Timetable manager (beta)** <img src="asset/image/logo.png" height="100" align="left"/>

<!-- **Indoor mapping solution for University campus.**  -->

**_(currently in concept and designing phase)_**

# **Language and Tools**

<p align="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"height="70"/>
<img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png"height="70"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Status_iucn_EX_icon_blank.svg" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-plain.svg" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="70"/>
<img src="https://camelot-py.readthedocs.io/en/master/_static/png/camelot-logo.png" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" height="70"/>
</p>

# File Structure

- **`asset`** folder to store logos, docs and extra files
- **`tester.js`** server.js testing
- **`testjsonparsing.js`** another function testing JS file
- **`class_id_dict.py`** stored class ID
- **`README.md`** README.md

<!-- # Future plans
    list below  |
                V     -->

#

# ==============================

## Things to work out right now _(kuch idea ya kaam hoga to list kardena neeche)_

- [x] (/table/post-teachertable) + body will contain json
      ~~**_1st api_** - post reqest to send the teacher subject relation data to the backend to save it to database~~
- [x] (/table/get-timetable) old api
      ~~**_2nd API_** - to fetch the same data through a GET API~~

~~_( idea being i will fetch the table when the page refreshes and if the data is there in the DB api will return the json and if not then not then we can edit the table according to our wish and phir post marunga **(1st api)** to save it this time )_~~

- [x] (/list/get-rooms)
      ~~**_3rd API_** - show the room list~~
- [x] (/list/get-faculties)
      ~~**_4th API_** - to fetch the teacher~~

~~_( i want these two seperate get APIs to return the data with no request params)_~~

- **5th api** - get request for fetching the subject list similar to `1st API` but this time include some details like below

      [
	      {
	      	"subjectcode": "xcs601",
	      	"subjectname":"career skills",
	      	"weekly_hrs": 2,
	      	"theory_practical":"theory"
	      },
	      {
	      	"subjectcode": "pcs602",
	      	"subjectname":"compiler lab",
	      	"weekly_hrs": 2,
	      	"theory_practical":"practical"
	      }
      ]
# ==============================

# Well Well Well Devanshu I did it AGAIN !! 
# I have a new DS for Time-Table storage 
- i was working on techniques to load timetable when the page loads, i observed a huge mistake i did by seperating the subject-teacher relation table from the time table ***[ I will explain it when i meet you ]***
- But for the time being 

## This is the proposed new improved structure 
***[ slot data is a optional field ]***

		{
            "course" : "btechcse",
            "semester" : "1",
            "section" : "A",
            "schedule": {
                "mon": {
                    "08-09": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
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
                "tue": {
                    "08-09": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
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
                "wed": {
                    "08-09": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
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
                "thu": {
                    "08-09": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
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
                "fri": {
                    "08-09": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
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
                "sat": {
                    "08-09": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
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
                "sun": {
                    "08-09": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "09-10": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "10-11": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "11-12": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "12-01": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "01-02": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "02-03": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "03-04": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "04-05": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  },
                    "05-06": {  "class_id" : "",  "subjectcode" : "",  "slotdata" : ""  }
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