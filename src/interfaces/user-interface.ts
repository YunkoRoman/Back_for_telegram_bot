export interface User {
  id: number;
  userName: string;
  telegramName: string;
  telegramId: number;
  phoneNumber: number;
  city: string;
  role: UserRole;
  state: string;
}

export enum UserRole {
  regular = 'regular',
  admin = 'admin',
  superAdmin = 'superAdmin'
}
