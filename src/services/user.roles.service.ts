import { UserRoleModel } from '../sequelize/models/user.role.model';
import { DB } from '../sequelize/models/index';

export default class UserRolesService {
  private DB;

  constructor(db: DB) {
    this.DB = db;
  }

  // ============ CRUD ==============

  public getAllRoles = async (): Promise<UserRoleModel[]> => {
    const result = await this.DB.Roles.findAll();
    return result;
  };

  public updateRoleById = async (userRole: UserRoleModel): Promise<UserRoleModel | any> => {
    await this.DB.Roles.update(userRole, { where: { id: userRole.id } });
  };
}
