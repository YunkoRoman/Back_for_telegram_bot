"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class UserController {
    constructor() {
        this.path = '/';
        this.router = express.Router();
        this.index = (req, res) => {
            const users = [
                {
                    id: 1,
                    name: 'Ali'
                },
                {
                    id: 2,
                    name: 'Can'
                },
                {
                    id: 3,
                    name: 'Ahmet'
                }
            ];
            res.send({ users });
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.index);
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map