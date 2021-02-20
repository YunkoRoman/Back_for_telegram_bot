import { UserAddToChat } from 'types/types';
import { Op } from 'sequelize';
import { UserModel } from '../sequelize/models/user.model';
import { DB } from '../sequelize/models/index';

export default class UserService {
  private DB;

  // eslint-disable-next-line no-shadow
  constructor(db: DB) {
    this.DB = db;
  }

  public getAllUsers = async (): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll();
    return result;
  };

  public findAndCountAll = async (): Promise<{ rows: UserModel[]; count: number }> => {
    const result = await this.DB.User.findAndCountAll();
    return result;
  };

  public findAndCountByType = async (idOfType: number): Promise<{ rows: UserModel[]; count: number }> => {
    const result = await this.DB.User.findAndCountAll({
      where: { typeId: idOfType },
    });
    return result;
  };

  // =============== CRUD =================

  public getUserById = async (userId: number | string): Promise<UserModel | null> => {
    const result = await this.DB.User.findOne({
      where: {
        telegramId: {
          [Op.eq]: userId,
        },
      },
    });
    return result;
  };

  public getAllUsersByTelName = async (telName: string): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll({
      where: {
        telegramName: {
          [Op.like]: telName,
        },
      },
    });
    return result;
  };

  public getAllUsersByName = async (userName: string): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll({
      where: {
        name: {
          [Op.like]: userName,
        },
      },
    });
    return result;
  };

  public getAllUsersByCity = async (userCity: string): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll({
      where: {
        city: {
          [Op.like]: userCity,
        },
      },
    });
    return result;
  };

  public getAllUsersByPhone = async (phone: string): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll({
      where: {
        phoneNumber: {
          [Op.like]: phone,
        },
      },
    });
    return result;
  };

  public getAllUsersByType = async (typeId: number): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll({ where: { typeId } });
    return result;
  };

  public getAllUsersByRole = async (roleId: number): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll({ where: { roleId } });
    return result;
  };

  public createUser = async (user: UserAddToChat): Promise<UserModel | any> => {
    const result = await this.DB.User.create(user);
    return result;
  };

  public updateUser = async (user: UserAddToChat): Promise<any> => {
    const result = await this.DB.User.update(user, {
      where: {
        telegramId: {
          [Op.eq]: user.telegramId,
        },
      },
      returning: true,
    });
    return result;
  };

  public deleteUser = async (userId: number | string): Promise<any> => {
    const result = await this.DB.User.destroy({ where: { telegramId: userId } });
    return result;
  };
}
