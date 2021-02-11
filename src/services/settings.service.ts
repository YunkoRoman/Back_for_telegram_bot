import { Op, where } from 'sequelize';
import { SettingsModel } from '../sequelize/models/settings.model';
import { DB } from '../sequelize/models/index';

export default class SettingsService {
  private DB;

  // eslint-disable-next-line no-shadow
  constructor(db: DB) {
    this.DB = db;
  }

  // ============ CRUD ==============

  public getAllSettings = async (): Promise<SettingsModel[]> => {
    const result = await this.DB.Settings.findAll();
    return result;
  };

  public createSetting = async (setting: SettingsModel): Promise<SettingsModel> => {
    const result = await this.DB.Settings.create(setting);
    return result;
  }

  public updateSetting = async (setting: SettingsModel): Promise<SettingsModel | any> => {
    const result = await this.DB.Settings.update(setting, {
      where: {
        id: setting.id,
      },
    });
    return result;
  }

  public deleteValue = async (valueToDelete: any): Promise<SettingsModel | any> => {
    const result = await this.DB.Settings.destroy({
      where: {
        value: valueToDelete,
      },
    });
    return result;
  }
}
