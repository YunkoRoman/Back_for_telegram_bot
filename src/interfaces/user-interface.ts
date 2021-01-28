export enum UserRole {
  regular = 'regular',
  admin = 'admin',
  superAdmin = 'superAdmin'
}

export interface User {
  id: number;
  name: string;
  telegramName: string;
  telegramId: number;
  phoneNumber: number;
  city: string;
  role: UserRole;
  state: string;
}
