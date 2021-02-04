import { UserAddToChat } from 'types/types';
import { UserModel } from '../sequelize/models/user.model';
import { DB } from '../sequelize/models/index';

export default class UserService {
  private DB;

  // eslint-disable-next-line no-shadow
  public constructor(db: DB) {
    this.DB = db;
  }

  public getAllUsers = async (): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll();
    return result;
  }

  public findAndCountAll = async (): Promise<{rows: UserModel[], count: number}> => {
    const result = await this.DB.User.findAndCountAll();
    return result;
  }

  public findAndCountByType = async (
    idOfType: number): Promise<{rows: UserModel[], count: number}> => {
    const result = await this.DB.User.findAndCountAll({
      where: { typeId: idOfType },
    });
    return result;
  }

  // =============== CRUD =================

  public getUserById = async (userId: number): Promise<UserModel | null> => {
    const result = await this.DB.User.findOne({ where: { id: userId } });
    return result;
  }

  public getAllUsersByType = async (typeId: number): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll({ where: { typeId } });
    return result;
  }

  public createUser = async (user: UserAddToChat): Promise<UserModel | any> => {
    const result = await this.DB.User.create(user);
    return result;
  }

  public updateUser = async (user: UserAddToChat): Promise<any> => {
    const result = await this.DB.User.update(user, {
      where: { id: user.id },
    });
    return result;
  }

  public deleteUser = async (userId: any): Promise<any> => {
    const result = await this.DB.User.destroy({ where: { id: userId } });
    return result;
  }
}
