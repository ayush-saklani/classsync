import Lists from "../models/listmodel.js";

const get_rooms = async (req, res, next) => {
    const rooms = await Lists.findOne({
        type: "rooms",
    }).select("data");

    res.status(200).json(rooms);
};

const get_faculties = async (req, res, next) => {
    const faculties = await Lists.findOne({
        type: "faculties",
    }).select("data");

    res.status(200).json(faculties);
};

const get_subjects = async (req, res, next) => {
    const subjects = await Lists.findOne({
        type: "subjects",
    }).select("data");

    res.status(200).json(subjects);
};

const save_list = async (req, res, next) => {
    const type = req.body.type;
    const data = req.body.data;

    const rooms_data = await Lists.findOne({
        type: type,
    });

    if (rooms_data) {
        await Lists.findOneAndUpdate(
            {
                type: type,
            },
            {
                $set: {
                    data: data,
                },
            }
        );
        res.status(200).json({ message: "success" });
    } else {
        res.status(200).json({ message: "no such list exists" });
    }
};

export { get_rooms, get_faculties, get_subjects, save_list };
