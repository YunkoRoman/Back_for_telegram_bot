import express from 'express';
import UserTypesService from 'services/user.types.service';
import AdminController from '../../controllers/admin.controller';
import FaqsService from '../../services/faqs.service';
import UserService from '../../services/user.service';
import { DB } from '../../sequelize/models/index';

export default function adminEdit(db: DB) {
  const api = express.Router();
  const adminController = new AdminController(new FaqsService(db),
    new UserService(db),
    new UserTypesService(db));

  api.put('/faculty', adminController.editFacultyInfo);

  api.put('/university', adminController.editUniversityInfo);

  api.post('/categories/', adminController.addNewType);

  api.get('/faqs', adminController.refreshFaqs);

  api.get('/categories/:typeId', adminController.selectUsersByCategory);

  return api;
}
