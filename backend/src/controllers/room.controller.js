import Rooms from "../models/room.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAll = asyncHandler(async (req, res, next) => {
    const rooms = await Rooms.find();
    res.status(200).json(new ApiResponse(200, rooms));
});

const getSpecified = asyncHandler(async (req, res, next) => {
    const classname = req.query.classname;
    if (!classname) {
        throw new ApiError(400, "Missing required parameter 'classname'");
    }
    const room = await Rooms.findOne({ classname: classname });
    if (!room) {
        throw new ApiError(404, "Room not found");
    }
    res.status(200).json(new ApiResponse(200, room));
});

const saveRoom = asyncHandler(async (req, res, next) => {
    const { classname, limit, schedule } = req.body;

    if (!classname || !limit || !schedule) {
        throw new ApiError(400, "Missing required parameters");
    }

    const roomExists = await Rooms.findOne({ classname: classname });
    if (roomExists) {
        await Rooms.findOneAndUpdate(
            { classname: classname },
            {
                $set: {
                    limit: limit,
                    schedule: schedule,
                },
            }
        );
        res.status(200).json(
            new ApiResponse(200, "Room exists, updated successfully")
        );
    } else {
        const newRoom = await Rooms.create({
            classname: classname,
            limit: limit,
            schedule: schedule,
        });
        await newRoom.save();
        res.status(200).json(
            new ApiResponse(201, "new room created successfully")
        );
    }
});

const removeRoom = asyncHandler(async (req, res, next) => {
    const classname = req.query.classname;
    if (!classname) {
        throw new ApiError(400, "Missing required parameter 'classname'");
    }
    const room = await Rooms.findOne({ classname: classname });
    if (!room) {
        throw new ApiError(404, "Room not found");
    }
    await Rooms.deleteOne({ classname: classname });
    res.status(200).json(new ApiResponse(200, "Room deleted successfully"));
});

export { getAll, getSpecified, saveRoom, removeRoom };
