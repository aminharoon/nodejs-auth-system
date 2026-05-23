import express from 'express';
import { authController } from '../controller/auth.controller.js';
import { validateRegister } from '../validation/auth.validator.js';
import { verifyUser } from '../middleware/auth.middleware.js';


const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", validateRegister, authController.register);

/**
 * @route POST /api/auth/verifyOtp
 * @desc Verify OTP for user registration
 * @access Public
 */
authRouter.post("/verifyOtp", authController.verifyOtp);

/**
 * @route POST /api/auth/resendOtp
 * @desc Resend OTP for user registration
 * @access Public
 */
authRouter.post("/resendOtp", authController.resendOtp);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.login);

/**
 * @route POST /api/auth/forgetPassword
 * @desc Forget password for a user
 * @access Private
 */
authRouter.post("/forgetPassword", verifyUser, authController.forgetPassword);

/**
 * @route POST /api/auth/changePassword
 * @desc Change password for a user
 * @access Private
 */
authRouter.post("/changePassword", verifyUser, authController.changePassword);

export default authRouter;