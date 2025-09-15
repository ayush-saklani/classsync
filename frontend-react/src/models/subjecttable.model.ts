// Subject Type (Defines a single subject entry)
export interface Subject {
    subjectcode: string;
    teacherid: string;
    weekly_hrs: string;
    teachername: string;
    subjectname: string;
    theory_practical: string;
    room_type: String,
}

// Subject Table Type (Defines the structure of subject allocation for a course & semester)
export interface subjectTable_schema {
    course: string;
    semester: string;
    teacher_subject_data: Subject[];
}
