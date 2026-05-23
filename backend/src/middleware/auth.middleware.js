import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
export const verifyUser = async (req, res, next) => {
    const { ACCESS_TOKEN } = req.cookies;


    if (!ACCESS_TOKEN) {
        return next(new ApiError(401, false, "Unauthorized"));
    }
    try {
        const decodedToken = jwt.verify(ACCESS_TOKEN, config.ACCESS_TOKEN);
        req.user = decodedToken;

        next();
    } catch (error) {
        return next(new ApiError(401, false, "Unauthorized"));
    }

}