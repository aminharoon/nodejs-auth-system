import express from 'express';
import { authController } from '../controller/auth.controller.js';
import { validateRegister } from '../validation/auth.validator.js';


const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", validateRegister, authController.register);

authRouter.post("/verifyOtp", authController.verifyOtp);

authRouter.post("/resendOtp", authController.resendOtp);

export default authRouter;