import { UserTypeModel } from '../sequelize/models/user.type.model';
import { DB } from '../sequelize/models/index';

export default class UserTypesService {
  private DB;

  // eslint-disable-next-line no-shadow
  public constructor(db: DB) {
    this.DB = db;
  }

  // ============ CRUD ==============

  public getAllUserTypes = async () : Promise<UserTypeModel[]> => {
    const result = await this.DB.Types.findAll();
    return result;
  }

  public addNewUserType = async (newType: UserTypeModel) : Promise<UserTypeModel> => {
    const result = await this.DB.Types.create(newType);
    return result;
  }

  public updateUserTypeById = async (userRole: UserTypeModel) : Promise<UserTypeModel | any> => {
    const result = await this.DB.Types.update(userRole, { where: { id: userRole.id } });
    return result;
  }
}
