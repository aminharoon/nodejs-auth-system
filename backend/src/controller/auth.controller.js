import { findUser, createUser } from "../dao/auth.dao.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { sendMail } from "../services/mail.services.js";
import { generateOtp } from "../utils/generateOtp.js";



const register = async (req, res) => {
    const { name, email, contact } = req.body

    const existingUser = await findUser({ $or: [{ email }, { contact }] });
    if (existingUser) {
        throw new ApiError(400, false, "Email or contact number already in use");
    }
    const otp = generateOtp();
    await sendMail(email, "Welcome to Our App", `Hi ${name}, welcome to our app! your OTP is ${otp}. It will expire in 10 minutes.`);
    const newUser = await createUser(
        { name, email, contact, otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) }
    );
    res.status(201).json(new ApiResponse(200, true, "User registered successfully", newUser));
}

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const user = await findUser({ email });
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

    user.verified = true;
    user.otp = "";
    await user.save();

    res.status(200).json(new ApiResponse(200, true, "OTP verified successfully", user));
}

const resendOtp = async (req, res) => {
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
}


export const authController = {
    register,
    verifyOtp,
    resendOtp
}
