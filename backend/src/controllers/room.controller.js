import Rooms from "../models/room.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAll = asyncHandler(async (req, res, next) => {
    const allowed_course = req.query.allowed_course;
    console.log(allowed_course);
    if (allowed_course) {
        const rooms = await Rooms.find({
            allowed_course: { $all: allowed_course },
        });
        res.status(200).json(new ApiResponse(200, rooms));
    } else {
        const rooms = await Rooms.find();
        res.status(200).json(new ApiResponse(200, rooms));
    }
});

const saveRoom = asyncHandler(async (req, res, next) => {
    const { roomid, name, type, capacity, schedule, allowed_course } = req.body;

    if (!roomid || !name || !type || !capacity || !schedule) {
        throw new ApiError(400, "Missing required parameters");
    }

    const roomExists = await Rooms.findOne({ roomid: roomid });
    if (roomExists) {
        await Rooms.findOneAndUpdate(
            { roomid: roomid },
            {
                $set: {
                    name: name,
                    type: type,
                    capacity: capacity,
                    schedule: schedule,
                    allowed_course: allowed_course,
                },
            }
        );
        res.status(200).json(
            new ApiResponse(200, "Room exists, updated successfully")
        );
    } else {
        const newRoom = await Rooms.create({
            roomid: roomid,
            name: name,
            type: type,
            capacity: capacity,
            schedule: schedule,
            allowed_course: allowed_course,
        });
        await newRoom.save();
        res.status(200).json(
            new ApiResponse(201, "new room created successfully")
        );
    }
});

const saveMultipleRooms = asyncHandler(async (req, res, next) => {
    const rooms = req.body.data;
    if (!rooms) {
        throw new ApiError(400, "Missing required parameters");
    }
    let roomidList = rooms.map((room) => room.roomid);

    await Rooms.deleteMany({ roomid: roomidList });

    await Rooms.insertMany(rooms);
    res.status(200).json(new ApiResponse(200, "Rooms created/updated successfully"));
});

const removeRoom = asyncHandler(async (req, res, next) => {
    const roomid = req.query.roomid;
    if (!roomid) {
        throw new ApiError(400, "Missing required parameter 'classname'");
    }
    const room = await Rooms.findOne({ roomid: roomid });
    if (!room) {
        throw new ApiError(404, "Room not found");
    }
    await Rooms.deleteOne({ roomid: roomid });
    res.status(200).json(new ApiResponse(200, "Room deleted successfully"));
});

const removeAllRooms = asyncHandler(async (req, res, next) => {
    await Rooms.deleteMany({});
    res.status(200).json(
        new ApiResponse(200, "All rooms deleted successfully")
    );
});

export { getAll, saveRoom, saveMultipleRooms, removeRoom, removeAllRooms };
