import { UserRole } from './user-role.enum';

export interface User {
  _id?: string;
  email: string;
  name: string;
  birthDate: Date;
  city: string;
  avatar: string;
  passwordHash: string;
  role: UserRole;
}
