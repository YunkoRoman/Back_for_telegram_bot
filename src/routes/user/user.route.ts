import express from 'express';
import UserService from '../../services/user.service';
import UserController from '../../controllers/user.crud.controller';
import { DB } from '../../sequelize/models/index';
import { hasRole, check_idMiddleware } from '../../utils/middlewares';
import { Role } from '../../sequelize/models/user.role.model';

export default function usersRoute(db: DB) {
  const api = express.Router();

  const userController = new UserController(new UserService(db));

  // ========== CRUD ====================
  // GET all admins
  api.get('/admins', hasRole([Role.superAdmin]), userController.getAllAdmins);

  // Count all users by type
  api.get('/admins/countbytypes', hasRole([Role.superAdmin]), userController.countAllUsersTypes);

  // Add admin
  api.put('/admins/:telegramId', [hasRole([Role.superAdmin])], userController.updateUserById);

  // Remove admin
  api.put('/admins/remove/:telegramId', hasRole([Role.superAdmin]), userController.updateUserById);

  // GET user by id
  api.get('/:telegramId', check_idMiddleware, userController.getUserById);

  // GET users by telegram name
  api.get('/telegram_name/:telegramName', userController.getUserByTelegramName);

  // GET users by name
  api.get('/name/:name', userController.getUserByName);

  // GET users by phone
  api.get('/phone/:phone', userController.getUserByPhone);

  // GET user by city
  api.get('/city/:city', userController.getUserByCity);

  // GET user by role
  api.get('/role/:id', check_idMiddleware, userController.getUserByRole);

  // GET user by type
  api.get('/type/:type', userController.getUserByType);

  // CREATE new user
  api.post('/', userController.createNewUser);

  // UPDATE user
  api.put('/:telegramId', check_idMiddleware, userController.updateUserById);

  // DELETE user by ID
  api.delete('/:telegramId', check_idMiddleware, userController.deleteUser);

  return api;
}
