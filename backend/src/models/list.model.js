import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    type: String,
    data: Object,
});

const Lists = new mongoose.model("lists", listSchema);

export default Lists;
