
export class ApplicationError extends Error {
    constructor(message, statusCode) {
        console.log(statusCode);
        super(message);
        this.statusCode = statusCode;
    }
}