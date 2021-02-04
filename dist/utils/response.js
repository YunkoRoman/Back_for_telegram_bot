"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failedResponse = exports.successResponse = exports.apiResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const types_1 = require("../types/types");
const apiResponse = (res, data, statusCode) => res.format({
    json: () => {
        res.type(types_1.applicationJson);
        res.status(statusCode).send(data);
    },
    default: () => {
        res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).send(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE));
    },
});
exports.apiResponse = apiResponse;
function successResponse(data) {
    return {
        success: true,
        data,
    };
}
exports.successResponse = successResponse;
function failedResponse(data) {
    return {
        success: false,
        data,
    };
}
exports.failedResponse = failedResponse;
//# sourceMappingURL=response.js.map