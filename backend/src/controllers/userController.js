import User from "../models/usermodel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const userDoc = await User.findById(userId);
        const accessToken = userDoc.generateAccessToken();
        const refreshToken = userDoc.generateRefreshToken();

        userDoc.refreshToken = refreshToken;
        await userDoc.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (err) {
        throw new ApiError(500, "Failed to generate access and refresh tokens");
    }
};

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

const loginUser = asyncHandler(async (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) {
        throw new ApiError(400, "Missing required parameters");
    }
    const user = await User.findOne({ name: name });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, refreshToken, accessToken },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res, next) => {
    console.log(req.user);
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "User logged out successfully"));
});

export { addUser, loginUser, logoutUser };
