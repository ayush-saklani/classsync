export interface Slot {
    course: string;
    semester: string;
    section: string[]; // Array of sections
    roomid: string[]; // Array of room IDs
    subjectcode: string;
}

// Day Schedule Type (Represents a single day's schedule with time slots)
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

// Faculty Type (Defines a faculty member with their schedule)
export interface faculty_schema {
    teacherid: string;
    name: string;
    schedule: Schedule;
}
