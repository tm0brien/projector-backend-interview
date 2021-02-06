export default class ApiError {
    public static wrap(error: ApiError | Error | string, statusCode?: number) {
        if (error instanceof ApiError) {
            return error
        } else if (error instanceof Error) {
            return new ApiError(error, statusCode)
        }
        return new ApiError(new Error(error), statusCode)
    }
    public readonly statusCode: number
    public readonly innerError: Error
    public constructor(error: Error | string, statusCode?: number) {
        if (error instanceof Error) {
            this.innerError = error
        } else {
            this.innerError = new Error(error)
        }
        this.statusCode = statusCode ?? 500
    }
}
