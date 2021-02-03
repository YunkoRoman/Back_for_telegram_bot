import { Op } from 'sequelize';
import { UserAddToChat } from 'types/types';
import { UserModel } from '../sequelize/models/user.model';
import { DB } from '../sequelize/models/index';

export default class UserService {
  // eslint-disable-next-line no-shadow
  public constructor(db: DB) {
    this.DB = db;
  }

  public getAllUsers = async (): Promise<UserModel[]> => {
    const result = await this.DB.User.findAll();
    return result;
  }

  public getUserById = async (userId: number): Promise<UserModel | null> => {
    const result = await this.DB.User.findOne({ where: { id: userId } });
    return result;
  }

  public createUser = async (user: UserAddToChat): Promise<UserModel | any> => {
    await this.DB.User.create(user);
  }

  public updateUser = async (user: UserAddToChat): Promise<UserModel | any> => {
    await this.DB.User.update(user, {
      where: { [Op.and]: { id: user.id } },
    });
  }

  public deleteUser = async (userId: any): Promise<any> => {
    await this.DB.User.destroy({ where: { id: userId } });
  }

  private DB;
}
