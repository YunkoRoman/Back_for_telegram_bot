import { UserModel } from 'sequelize/models/user.model';
import { UserAddToChat } from 'types/types';
import { DB } from '../sequelize/models/index';

export default class UserService {
  private DB;

  // eslint-disable-next-line no-shadow
  public constructor(db: DB) {
    this.DB = db;
  }

  public async getAllUsers(): Promise<UserModel[]> {
    const result = await this.DB.User.findAll();
    return result;
  }

  public async getUserById(userId: number): Promise<UserModel | null> {
    const result = await this.DB.User.findOne({ where: { id: userId } });
    return result;
  }

  public async createUser(user: UserAddToChat): Promise<UserModel> {
    const result = await this.DB.User.create(user);
    return result;
  }
}
