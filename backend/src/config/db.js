import mongoose from "mongoose"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { config } from "./config.js"

export const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${config.DATABASE_URI}/loginWithOtp`)
        console.log("✅ connected with data base ")




    } catch (e) {
        throw new ApiError(500, false, "Database connection failed", { error: e.message })
    }
}