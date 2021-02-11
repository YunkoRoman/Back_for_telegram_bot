import express from 'express';
import UnansweredService from '../../services/unanswered.service';
import UserTypesService from '../../services/user.types.service';
import AdminController from '../../controllers/admin.controller';
import FaqsService from '../../services/faqs.service';
import UserController from '../../controllers/user.crud.controller';
import UserService from '../../services/user.service';
import { DB } from '../../sequelize/models/index';
import { hasRole } from '../../utils/middlewares';
import { Role } from '../../sequelize/models/user.role.model';

export default function adminStats(db: DB) {
  const api = express.Router();

  const adminController = new AdminController(new FaqsService(db),
    new UserService(db),
    new UserTypesService(db),
    new UnansweredService(db));
  const userController = new UserController(new UserService(db));

  // Most popular FAQ
  api.get('/popular', hasRole([Role.admin, Role.superAdmin]), adminController.getMostPopularFaqs);

  // Get all unanswered questions
  api.get('/unanswered', hasRole([Role.admin, Role.superAdmin]), adminController.getUnanswered);

  // Get total number of users
  api.get('/count', hasRole([Role.admin, Role.superAdmin]), userController.countAllUsers);

  // Get total users by group(type)
  api.get('/count/:typeId', hasRole([Role.admin, Role.superAdmin]), userController.countByType);

  // Put faculty answer
  api.put('/faculty', hasRole([Role.admin, Role.superAdmin]), adminController.editFacultyInfo);

  // Put university answer
  api.put('/university', hasRole([Role.admin, Role.superAdmin]), adminController.editUniversityInfo);

  // Get all categories
  api.get('/categories', hasRole([Role.admin, Role.superAdmin]), adminController.getAllUserTypes);

  // Create new user category
  api.post('/categories', hasRole([Role.admin, Role.superAdmin]), adminController.addNewType);

  // Get all faqs
  api.get('/faqs', hasRole([Role.admin, Role.superAdmin]), adminController.refreshFaqs);

  // Get users by category
  api.get('/categories/:typeId', hasRole([Role.admin, Role.superAdmin]), adminController.selectUsersByCategory);

  return api;
}
