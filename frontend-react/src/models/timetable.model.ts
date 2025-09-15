// Subject Type
export interface Subject {
    subjectcode: string;
    teacherid: string;
    weekly_hrs: string;
    teachername: string;
    subjectname: string;
    theory_practical: string;
    room_type: String,
}

// Slot Type
export interface Slot {
    class_id: string;
    subjectcode: string;
    slotdata: string;
}

// Day Type (Represents a single day's schedule with time slots)
export interface Day {
    "08-09"?: Slot;
    "09-10"?: Slot;
    "10-11"?: Slot;
    "11-12"?: Slot;
    "12-01"?: Slot;
    "01-02"?: Slot;
    "02-03"?: Slot;
    "03-04"?: Slot;
    "04-05"?: Slot;
    "05-06"?: Slot;
}

// Weekly Schedule Type (Contains all days)
export interface Schedule {
    mon?: Day;
    tue?: Day;
    wed?: Day;
    thu?: Day;
    fri?: Day;
    sat?: Day;
    sun?: Day;
}

// Main Table Type (Timetable Structure)
export interface timetable_schema {
    course: string;
    semester: string;
    section: string;
    schedule: Schedule;
    teacher_subject_data: Subject[];
}
