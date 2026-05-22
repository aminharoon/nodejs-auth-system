import ApiError from "../utils/ApiError.js";

export const errorMiddleware = (err, req, res, next) => {

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            stack: err.stack,
            errors: err.errors || [],
        });
    }
}