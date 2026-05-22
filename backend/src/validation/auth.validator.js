import { body, validationResult } from 'express-validator'
import ApiError from '../utils/ApiError.js'

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new ApiError(400, false, "Validation errors", errors.array()))
    }
    next();
}

export const validateRegister = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("contact").notEmpty().withMessage("Contact number is required"),

    handleValidationErrors
]

