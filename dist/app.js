"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const index_1 = require("./sequelize/models/index");
function appFunc() {
    const app = express_1.default();
    index_1.db.sequelize.sync({ force: true }).then(() => console.log('Authenticated'));
    // db.sequelize.sync({ force: true });
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use('/users', users_route_1.default(index_1.db));
    return app;
}
exports.default = appFunc;
//# sourceMappingURL=app.js.map