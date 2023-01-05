import { User } from './user.interface';

export type JwtPayload = Pick<User, 'email' | 'name'> & {
  sub: string;
};
