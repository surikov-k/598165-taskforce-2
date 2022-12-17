import { City, Skill, UserRole } from '@task-force/shared-types';

export interface User {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  birthday: Date;
  registered?: Date,
  city: City;
  about: string;
  avatar?: string;
  skills?: Skill[];
  phone?: string;
  telegram?: string;
  role: UserRole;
}
