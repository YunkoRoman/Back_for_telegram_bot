import { UserTypeModel } from '../sequelize/models/user.type.model';
import { DB } from '../sequelize/models/index';

export default class UserTypesService {
  private DB;

  constructor(db: DB) {
    this.DB = db;
  }

  // ============ CRUD ==============

  public getAllUserTypes = async (): Promise<UserTypeModel[]> => {
    const result = await this.DB.Types.findAll();
    return result;
  };

  public getUserTypeById = async (typeId: number): Promise<UserTypeModel[]> => {
    const result = await this.DB.Types.findAll({
      where: {
        id: typeId,
      },
    });
    return result;
  };

  public addNewUserType = async (newType: UserTypeModel): Promise<UserTypeModel> => {
    const result = await this.DB.Types.create(newType);
    return result;
  };

  public updateUserTypeById = async (userType: UserTypeModel): Promise<UserTypeModel | any> => {
    const result = await this.DB.Types.update(userType, { where: { id: userType.id } });
    return result;
  };
}
