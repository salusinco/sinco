"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SincoResponse = void 0;
function SincoResponse({ data, success, error, error_code, reason, status, } = {}) {
    if (error_code && (error !== null && error !== void 0 ? error : null) === null)
        error = true;
    if ((success !== null && success !== void 0 ? success : null) === null)
        success = !error;
    if ((error !== null && error !== void 0 ? error : null) === null)
        error = !success;
    if (error && !error_code)
        error_code = "UNKNOWN";
    let response = { success: success, error: error };
    if (error_code)
        response['error_code'] = error_code;
    if (reason)
        response['reason'] = reason;
    if (data)
        response['data'] = data;
    if (!status) {
        // if (error) status = 500;
        // else if (!success) status = 400;
        // else status = 200;
        status = 200;
    }
    return { status: status, obj: response };
}
exports.SincoResponse = SincoResponse;
function sincoResponser(req, res, next) {
    res.sinco = (obj = {}) => {
        const toSend = SincoResponse(obj);
        res.status(toSend.status);
        res.send(toSend.obj);
    };
    next();
}
exports.default = sincoResponser;
//# sourceMappingURL=index.js.map