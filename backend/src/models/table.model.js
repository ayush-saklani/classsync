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

const slotSchema = new mongoose.Schema({
    class_id: String,
    subjectcode: String,
    slotdata: String,
});

const daySchema = new mongoose.Schema({
    "08-09": slotSchema,
    "09-10": slotSchema,
    "10-11": slotSchema,
    "11-12": slotSchema,
    "12-01": slotSchema,
    "01-02": slotSchema,
    "02-03": slotSchema,
    "03-04": slotSchema,
    "04-05": slotSchema,
    "05-06": slotSchema,
});

const scheduleSchema = new mongoose.Schema({
    mon: daySchema,
    tue: daySchema,
    wed: daySchema,
    thu: daySchema,
    fri: daySchema,
    sat: daySchema,
    sun: daySchema,
});

const tableSchema = new mongoose.Schema({
    course: String,
    semester: String,
    section: String,
    schedule: scheduleSchema,
    teacher_subject_data: [subjectSchema],
});

const Tables = new mongoose.model("Tables", tableSchema);

export default Tables;
