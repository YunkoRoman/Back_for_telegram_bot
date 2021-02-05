import express from 'express';
import UnansweredService from '../../services/unanswered.service';
import UserTypesService from '../../services/user.types.service';
import AdminController from '../../controllers/admin.controller';
import FaqsService from '../../services/faqs.service';
import UserController from '../../controllers/user.crud.controller';
import UserService from '../../services/user.service';
import { DB } from '../../sequelize/models/index';

export default function adminStats(db: DB) {
  const api = express.Router();

  const adminController = new AdminController(new FaqsService(db),
    new UserService(db),
    new UserTypesService(db),
    new UnansweredService(db));
  const userController = new UserController(new UserService(db));

  // Most popular FAQ
  api.get('/popular', adminController.getMostPopularFaqs);

  // Get all unanswered questions
  api.get('/unanswered', adminController.getUnanswered);

  // Get total number of users
  api.get('/count', userController.countAllUsers);

  // Get total users by group(type)
  api.get('/count/:typeId', userController.countByType);

  // Put faculty answer
  api.put('/faculty', adminController.editFacultyInfo);

  // Put university answer
  api.put('/university', adminController.editUniversityInfo);

  // Get all categories
  api.get('/categories', adminController.getAllUserTypes);

  // Create new user category
  api.post('/categories', adminController.addNewType);

  // Get all faqs
  api.get('/faqs', adminController.refreshFaqs);

  // Get users by category
  api.get('/categories/:typeId', adminController.selectUsersByCategory);

  return api;
}
