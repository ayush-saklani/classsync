import User from "../models/usermodel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const addUser = asyncHandler(async (req, res, next) => {
    const { role, name, password } = req.body;
    if (!role || !name || !password) {
        throw new ApiError(400, "Missing required parameters");
    }
    const existingUser = await User.findOne({ name: name });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        role,
        name,
        password,
    });

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!userCreated) {
        throw new ApiError(500, "Failed to create user");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, userCreated, "User added successfully"));
});

export { addUser };
