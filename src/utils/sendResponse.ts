import { Response } from "express"

interface SendResponseSchema<T> {
    res: Response;
    statusCode?: number;
    success?: boolean;
    message?: string;
    data?: T | null;
    meta?: Record<string, any>;
}

const sendResponse = <T>({
    res, 
    statusCode = 200, 
    success = true, 
    message = success ? "Request successful" : "Request failed", 
    data = null, 
    meta
}: SendResponseSchema<T>) => {
    const responseBody = {
        success,
        message,
        ...(success && data && {data}),
        ...(success && meta && {meta})
    }

    return res.status(statusCode).json(responseBody)
}

export default sendResponse;