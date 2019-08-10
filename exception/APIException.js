class APIException extends Error {
    constructor(message, status, stack) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.stack = stack;
    }
}

module.exports = APIException;