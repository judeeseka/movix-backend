import { Response } from "express"

interface SendResponseSchema {
    res: Response;
    statusCode?: number;
    success?: boolean;
    message?: string;
    data?: any;
    meta?: Record<string, any>;
}

const sendResponse = ({
    res, 
    statusCode = 200, 
    success = true, 
    message = success ? "Request successful" : "Request failed", 
    data = null, 
    meta
}: SendResponseSchema) => {
    const responseBody = {
        success,
        message,
        ...(success && data && {data}),
        ...(success && meta && {meta})
    }

    return res.status(statusCode).json(responseBody)
}

export default sendResponse;