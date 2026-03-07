export function errorHandler(err, req, res, next) {
    if (err && err.type === "entity.parse.failed") {
        err.status = 400;
        err.code = "INVALID_JSON";
        err.message = "Invalid JSON format";
    }

    const payload = errorResponse(err);
    res.status(payload.status).json(payload);
}



function errorResponse(err) {
    err = err || {};

    let status = 500;
    const rawStatus = parseInt(err.statusCode || err.status, 10);
    if (rawStatus >= 400 && rawStatus <= 599) status = rawStatus;

    let code = "INTERNAL_SERVER_ERROR";
    if (err.code) code = err.code;
    
    let message = "Internal Server Error";
    if (err.message) message = err.message;
    const response = { status, code, message };

    if (err.details) response.details = err.details;
    if (err.stack) response.stack = err.stack;

    return response;
}
