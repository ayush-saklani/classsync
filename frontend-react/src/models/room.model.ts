// Slot Type
export interface Slot {
    roomid: string | undefined;
    course: string;
    semester: string;
    section: string[]; // Array of sections
    teacherid: string;
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
  
  // Room Type (Room Details with Weekly Schedule)
  export interface room_schema {
    roomid: string;
    name: string;
    type: string;
    capacity: number;
    allowed_course: string[]; // Array of allowed courses
    schedule: Schedule;
  }
  