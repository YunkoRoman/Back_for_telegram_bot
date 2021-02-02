"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use('/users', users_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map