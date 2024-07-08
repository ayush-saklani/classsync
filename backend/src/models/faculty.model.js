import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    course: String,
    semester: String,
    section: Array,
    roomid: Array,
    subjectcode: String,
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

const facultySchema = new mongoose.Schema({
    teacherid: String,
    name: String,
    schedule: scheduleSchema,
});

const Faculties = new mongoose.model("faculties", facultySchema);

export default Faculties;
