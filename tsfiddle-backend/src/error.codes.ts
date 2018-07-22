export enum ErrorCode {
    NOT_FOUND='NOT_FOUND',
    ORM_ERROR='ORM_ERROR',
    GENERIC='NO_SPECIFIC_INFORMATION_AVAILABLE'
}

export class ErrorObject {
    constructor(public error: ErrorCode) {}
}