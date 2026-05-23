import { findUser, createUser } from "../dao/auth.dao.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { sendMail } from "../services/mail.services.js";
import { generateOtp } from "../utils/generateOtp.js";
import { optHtml, loginHtml, verifyHtml } from "../template/index.js";
import asyncHandler from '../utils/asyncHandler.js';
import userModel from "../models/user.model.js";



const register = asyncHandler(async (req, res) => {
    const { name, email, password, contact } = req.body

    const existingUser = await findUser({ $or: [{ email }, { contact }] });
    if (existingUser) {
        throw new ApiError(400, false, "Email or contact number already in use");
    }
    const otp = generateOtp();
    const newUser = await createUser(
        { name, email, password, contact, otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) }
    );
    await sendMail(email, "Welcome to Our App", `Hi ${name}, welcome to our app! your OTP is ${otp}. It will expire in 10 minutes.`, optHtml(otp));
    res.status(201).json(new ApiResponse(200, true, "User registered successfully", newUser));
})



const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const user = await findUser({ $or: [{ email }, { otp }] });
    if (!email || !otp) {
        throw new ApiError(400, false, "Email and OTP are required");
    }



    if (!user) {
        throw new ApiError(404, false, "User not found");
    }
    if (user.verified) {
        throw new ApiError(400, false, "User already verified");
    }

    const isOtpValid = await user.compareOtp(otp);

    if (!isOtpValid) {
        throw new ApiError(400, false, "Invalid OTP");
    }

    await userModel.updateOne(
        { _id: user._id },
        {
            $set: {
                verified: true,
            },
            $unset: {
                otp: "",
                expiresAt: ""
            }
        },
        {
            new: true,
        }
    )



    await sendMail(email, "Email Verified", "Your email has been successfully verified. You can now log in to your account.", verifyHtml());

    res.status(200).json(new ApiResponse(200, true, "OTP verified successfully", user));
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });


    if (!user) {
        throw new ApiError(404, false, "User not found");
    }
    if (!user.verified) {
        throw new ApiError(400, false, "Please verify your account  before logging in");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(400, false, "Invalid password");
    }
    const { AccessToken, refreshToken } = await generateAccessAndRefreshToken(user);
    await sendMail(email, "Login Successful", "You have successfully logged in to your account.", loginHtml());
    res
        .status(200)
        .cookie("ACCESS_TOKEN", AccessToken, { httpOnly: true, secure: true, sameSite: "strict" })
        .cookie("REFRESH_TOKEN", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" })
        .json(new ApiResponse(200, true, "Login successful", user));
}
)

const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await findUser({ email });
    if (!user) {
        throw new ApiError(404, false, "User not found");
    }

    const otp = generateOtp();
    await sendMail(email, "Resend OTP", `Your new OTP is ${otp}. It will expire in 10 minutes.`);
    await updateUser({ email }, "otp", otp);
    await updateUser({ email }, "expiresAt", new Date(Date.now() + 10 * 60 * 1000));


    res.status(200).json(new ApiResponse(200, true, "OTP resent successfully", user));
})

const forgetPassword = asyncHandler(async (req, res) => {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        throw new ApiError(400, false, "Password and confirm password do not match");
    }

    const user = await userModel.findById(req.user._id)
    user.password = password
    await user.save()
    res.status(200).json(new ApiResponse(200, true, "Password Changed successfully ", user))


})

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
        throw new ApiError(400, false, "confirm password doe't match ")
    }

    const user = await userModel.findById(req.user._id);
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
        throw new ApiError(400, false, "Current password is incorrect");
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json(new ApiResponse(200, true, "Password changed successfully", user));

})


export const authController = {
    register,
    verifyOtp,
    login,
    resendOtp,
    forgetPassword,
    changePassword,
    forgetPassword
}
