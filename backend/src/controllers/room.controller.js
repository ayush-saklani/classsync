import Rooms from "../models/room.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAll = asyncHandler(async (req, res, next) => {
    const rooms = await Rooms.find();
    res.status(200).json(new ApiResponse(200, rooms));
});

const getSpecified = asyncHandler(async (req, res, next) => {
    const roomid = req.query.roomid;
    if (!roomid) {
        throw new ApiError(400, "Missing required parameter 'classname'");
    }
    const room = await Rooms.findOne({ roomid: roomid });
    if (!room) {
        throw new ApiError(404, "Room not found");
    }
    res.status(200).json(new ApiResponse(200, room));
});

const saveRoom = asyncHandler(async (req, res, next) => {
    const { roomid, name, type, capacity, schedule } = req.body;

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
        });
        await newRoom.save();
        res.status(200).json(
            new ApiResponse(201, "new room created successfully")
        );
    }
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

export { getAll, getSpecified, saveRoom, removeRoom };
