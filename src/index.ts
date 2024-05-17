import { NextFunction, Response, Request } from "express";

export declare type SincoResponseParemeters = {
    data?: Record<string, any>,
    success?: boolean,
    error?: boolean,
    error_code?: string, 
    reason?: string,
    status?: number,
};

export declare type SincoResponseObject = {
    success: boolean,
    error: boolean,
    error_code?: string,
    reason?: string,
    data?: Record<string, any>
};

declare global {
    namespace Express {
        interface Response {
            sinco: (obj?: SincoResponseParemeters) => void;
            body: Record<string, string>
        }
    }
}

export function SincoResponse({
    data,
    success,
    error,
    error_code,
    reason,
    status,
}: SincoResponseParemeters = {}): { status: number, obj: SincoResponseObject } {
    if (error_code && (error ?? null) === null) error = true;
    if ((success ?? null) === null) success = !error;
    if ((error ?? null) === null) error = !success;
    if (error && !error_code) error_code = "UNKNOWN"; 
    
    let response: SincoResponseObject = { success: success!, error: error! };
    if (error_code) response['error_code'] = error_code;
    if (reason) response['reason'] = reason;
    if (data) response['data'] = data;

    if (!status) {
        // if (error) status = 500;
        // else if (!success) status = 400;
        // else status = 200;
        status = 200;
    }

    return { status: status, obj: response };
}

export default function sincoResponser(req: Request, res: Response, next: NextFunction) {
    res.sinco = (obj: SincoResponseParemeters = {}) => {
        const toSend = SincoResponse(obj);
        res.status(toSend.status);
        res.send(toSend.obj);
    }
    next();
}