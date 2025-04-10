import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectcode: String,
    teacherid: String,
    weekly_hrs: String,
    teachername: String,
    subjectname: String,
    theory_practical: String,
    room_type: String,
});

const subjecttableSchema = new mongoose.Schema({
    course: String,
    semester: String,
    teacher_subject_data: [subjectSchema],
});

const SubjectTable = new mongoose.model("subjecttable", subjecttableSchema);

export default SubjectTable;
