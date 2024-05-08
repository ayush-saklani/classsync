import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    rooms: Map,
    faculties: Map,
    subjects: Map,
});

const Lists = new mongoose.model("lists", listSchema);

export default Lists;
