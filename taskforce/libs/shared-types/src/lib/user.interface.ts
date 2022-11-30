import { City, UserRole } from '@task-force/shared-types';

export interface User {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  birthday: Date;
  // registered: Date,
  city: City;
  about: string;
  avatar?: string;
  skills?: string[];
  phone?: string;
  telegram?: string;
  role: UserRole;
}
