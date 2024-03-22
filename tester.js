// data structure testing
class classroom{
    constructor(){
        this.time_slot_test={
            '08-09':{   //8-9
                class_status:0,
                teacher_ID:0
            },
            '09-10':{  //9-10
                class_status:0,
                teacher_ID:0
            },
            '10-11':{  //10-11
                class_status:0,
                teacher_ID:0
            },
            '11-12':{  //11-12
                class_status:0,
                teacher_ID:0
            },
            '12-01':{  //12-01
                class_status:0,
                teacher_ID:0
            },
            '01-02':{  //01-02
                class_status:0,
                teacher_ID:0
            },
            '02-03':{  //02-03
                class_status:0,
                teacher_ID:0
            },
            '03-04':{  //03-04
                class_status:0,
                teacher_ID:0
            },
            '04-05':{  //04-05
                class_status:0,
                teacher_ID:0
            },
            '05-06':{  //05-06
                class_status:0,
                teacher_ID:0
            }
        }    
    }
}
let a = new classroom(); // cr101
a.time_slot_test["01-02"].class_status = 1
console.log(a.time_slot_test["01-02"].class_status);