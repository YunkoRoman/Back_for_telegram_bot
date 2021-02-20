import express from 'express';
import UnansweredService from '../../services/unanswered.service';
import FaqsService from '../../services/faqs.service';
import { DB } from '../../sequelize/models/index';
import FaqsController from '../../controllers/faqs.controller';
import { check_idMiddleware } from '../../utils/middlewares';

export default function infoRoute(db: DB) {
  const api = express.Router();

  const faqsController = new FaqsController(new FaqsService(db), new UnansweredService(db));
  // ========== FETCH INTENTS ===========
  api.get('/refresh', faqsController.fetchIntents);
  // ========== UPDATE COUNT ============
  api.post('/update', faqsController.updateCount);
  // ========== CRUD ====================
  // GET all faqs
  api.get('/all', faqsController.getAllFaqs);

  api.get('/faculty', faqsController.getFacultyInfo);

  api.get('/university', faqsController.getUniversityInfo);

  api.get('/popular', faqsController.getPopularFaqs);

  api.get('/faq', faqsController.getFaqByQuestion);

  api.post('/faq', faqsController.addFaq);

  // GET faq by id
  api.get('/faq/:id', check_idMiddleware, faqsController.getFaqById);

  api.get('/unanswered', faqsController.getAllUnanswered);

  api.get('/unanswered/:question', faqsController.getUnansweredByQuestion);

  api.post('/unanswered', faqsController.addUnanswered);

  return api;
}
