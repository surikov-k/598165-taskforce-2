import { City } from './city.type';
import { Skill } from './skill.interface';
import { UserRole } from './user-role.enum';

export interface User {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  refreshTokenHash: string;
  birthDate: Date;
  registeredAt: Date;
  city: City;
  about?: string;
  avatar?: string;
  skills?: Skill[];
  phone?: string;
  telegram?: string;
  role: UserRole;
  rating: number;
}
