import express from 'express';
import FaqsService from '../../services/faqs.service';
import { DB } from '../../sequelize/models/index';
import FaqsController from '../../controllers/faqs.controller';

export default function infoRoute(db: DB) {
  const api = express.Router();

  const faqsController = new FaqsController(new FaqsService(db));

  // ========== CRUD ====================
  // GET all faqs
  api.get('/all', faqsController.getAllFaqs);

  api.get('/faculty', faqsController.getFacultyInfo);

  api.get('/university', faqsController.getUniversityInfo);

  api.get('/popular', faqsController.getPopularFaqs);

  api.get('/faq', faqsController.getFaqByQuestion);
  // GET faq by id
  api.get('/faq/:id', faqsController.getFaqById);

  return api;
}
