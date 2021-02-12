"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customErrors = void 0;
exports.customErrors = {
    //400
    BAD_REQUEST_NO_DATA: {
        message: "Data is not present"
    },
    BAD_REQUEST_NO_ROLE_ID: {
        message: "Role id is not present"
    },
    BAD_REQUEST_NO_TELEGRAM_ID: {
        message: "Telegram id is not present, in header (X-User-id)"
    },
    //404
    NOT_FOUND: {
        message: "Record not found"
    },
    //403
    FORBIDDEN: {
        message: "user does not have access rights"
    }
};
//# sourceMappingURL=customErrors.js.map