"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_interface_1 = require("../interfaces/user-interface");
const usersRoute = express_1.default.Router();
// Mock data
const usersList = [
    {
        id: 1,
        userName: 'User1',
        telegramName: '@user1',
        telegramId: 11,
        phoneNumber: 555555,
        city: 'Kyiv',
        role: user_interface_1.UserRole.admin,
        state: 'stringified json',
    },
    {
        id: 2,
        userName: 'User2',
        telegramName: '@user2',
        telegramId: 22,
        phoneNumber: 666666,
        city: 'Kharkiv',
        role: user_interface_1.UserRole.regular,
        state: 'stringified json',
    },
    {
        id: 3,
        userName: 'User4',
        telegramName: '@user3',
        telegramId: 33,
        phoneNumber: 777777,
        city: 'Lviv',
        role: user_interface_1.UserRole.superAdmin,
        state: 'stringified json',
    },
];
// GET all users
usersRoute.get('/', (req, res) => {
    res.status(200).send(usersList);
});
// GET user by id
usersRoute.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = usersList.find((item) => item.id === parseInt(id, 10));
    res.status(200).send(user);
});
// PUT user by id
usersRoute.put('/:id', (req, res) => {
    res.status(200).send(req.query);
});
usersRoute.delete('/:id', (req, res) => {
    res.send(200).send(`User with id: ${req.params.id} and params ${req.query} has been deleted.a`);
});
exports.default = usersRoute;
//# sourceMappingURL=users-route.js.map