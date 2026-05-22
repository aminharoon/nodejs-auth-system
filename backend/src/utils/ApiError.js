class ApiError extends Error {
    constructor(statusCode, success = false, message, errors = [], data = {}, stack) {
        super(message);

        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.errors = errors;
        this.data = data;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;