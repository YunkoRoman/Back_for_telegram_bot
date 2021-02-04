import { UserRoleModel } from '../sequelize/models/user.role.model';
import { DB } from '../sequelize/models/index';

export default class UserRolesService {
  private DB;

  // eslint-disable-next-line no-shadow
  public constructor(db: DB) {
    this.DB = db;
  }

  // ============ CRUD ==============

  public getAllFaqs = async () : Promise<UserRoleModel[]> => {
    const result = await this.DB.Roles.findAll();
    return result;
  }

  public updateFaqById = async (userRole: UserRoleModel) : Promise<FaqModel | any> => {
    await this.DB.Roles.update(userRole, { where: { id: userRole.id } });
  }
}
