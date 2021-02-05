"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./utils/logger"));
const user_route_1 = __importDefault(require("./routes/user/user.route"));
const admin_route_1 = __importDefault(require("./routes/admin/admin.route"));
const faqs_route_1 = __importDefault(require("./routes/faqs/faqs.route"));
const index_1 = require("./sequelize/models/index");
function appFunc() {
    const app = express_1.default();
    index_1.db.sequelize.authenticate().then(() => logger_1.default.info('Authenticated'));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use('/users', user_route_1.default(index_1.db));
    app.use('/admin', admin_route_1.default(index_1.db));
    app.use('/info', faqs_route_1.default(index_1.db));
    return app;
}
exports.default = appFunc;
//# sourceMappingURL=app.js.map