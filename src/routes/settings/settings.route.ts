import express from 'express';
import { DB } from '../../sequelize/models/index';
import SettingsController from '../../controllers/settings.controller';
import SettingsService from '../../services/settings.service';

export default function settingsRoute(db: DB) {
  const api = express.Router();

  const settingsController = new SettingsController(new SettingsService(db));

  // ========== CRUD ====================
  // GET all settings
  api.get('/', settingsController.getAllSettings);

  // CREATE param
  api.post('/', settingsController.createSetting);

  // Edit value
  api.put('/:id', settingsController.udpdateById);

  // Remove value
  api.delete('/', settingsController.deleteValue);

  return api;
}
