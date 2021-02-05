import express from 'express';
import UserService from '../../services/user.service';
import UserController from '../../controllers/user.crud.controller';
import { DB } from '../../sequelize/models/index';

export default function usersRoute(db: DB) {
  const api = express.Router();

  const userController = new UserController(new UserService(db));

  // ========== CRUD ====================
  // GET all users
  api.get('/admins', userController.getAllAdmins);
  // api.get('/', userController.getAllUsers);

  // GET all admins

  // GET user by id
  api.get('/:telegramId', userController.getUserById);

  api.get('/admins', userController.getAllAdmins);

  // CREATE new user
  api.post('/', userController.createNewUser);

  // UPDATE user
  api.put('/:telegramId', userController.updateUserById);

  // DELETE user by ID
  api.delete('/:telegramId', userController.deleteUser);

  return api;
}
