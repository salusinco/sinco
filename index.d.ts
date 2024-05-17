import { NextFunction, Response, Request } from "express";
export declare type SincoResponseParemeters = {
    data?: Record<string, any>;
    success?: boolean;
    error?: boolean;
    error_code?: string;
    reason?: string;
    status?: number;
};
export declare type SincoResponseObject = {
    success: boolean;
    error: boolean;
    error_code?: string;
    reason?: string;
    data?: Record<string, any>;
};

declare global {
    namespace Express {
        interface Response {
            sinco: (obj?: SincoResponseParemeters) => void;
            body: Record<string, string>;
        }
    }
}
export declare function SincoResponse({ data, success, error, error_code, reason, status, }?: SincoResponseParemeters): {
    status: number;
    obj: SincoResponseObject;
};
export default function sincoResponser(req: Request, res: Response, next: NextFunction): void;
