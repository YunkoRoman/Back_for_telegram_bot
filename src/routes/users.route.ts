import express from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import { DB } from '../sequelize/models/index';

export default function usersRoute(db: DB) {
  const api = express.Router();

  const userController = new UserController(new UserService(db));

  api.get('/', userController.getAllUsers);

  return api;
}
