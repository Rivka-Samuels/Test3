import { NextFunction, Request, Response } from "express";
import { AppException } from "../models/exceptions";
import { StatusCode } from "../models/statusEnum";
import { writeErrorLog } from "../utils/helpers";

// Helper function to format error messages with additional information
function formatErrorMessage(err: any, req: Request): string {
    const dateTime = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    return `Date: ${dateTime}\nIP: ${ip}\nError: ${err.message}\nStack: ${err.stack}`;
}

function catchAll(err: any, req: Request, res: Response, next: NextFunction) {
    // Format the error message with additional information
    const formattedError = formatErrorMessage(err, req);
    
    // Write the formatted error to the log file
    writeErrorLog(formattedError);

    if (err instanceof AppException) {
        // Handle known application exceptions
        res.status(err.status).send(err.message);
    } else {
        // Handle unknown errors
        res.status(StatusCode.ServerError).send("Internal Server Error");
    }
}

export default catchAll;
