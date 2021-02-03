import { UserModel } from 'sequelize/models/user.model';
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
}
