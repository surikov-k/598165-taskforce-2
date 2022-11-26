import { User } from '@task-force/shared-types'
import { UserRole } from '@task-force/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './app-user.constants';

export class AppUserEntity implements User {
  _id?: string;
  email: string;
  name: string;
  birthDate: Date;
  city: string;
  avatar: string;
  passwordHash: string;
  role: UserRole;

  constructor(appUser: User) {
    this.fillEntity(appUser);
  }

  public async setPassword(password: string):Promise<AppUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(appUser: User) {
    this._id = appUser._id;
    this.email = appUser.email;
    this.name = appUser.name;
    this.passwordHash = appUser.passwordHash;
    this.birthDate = appUser.birthDate;
    this.city =appUser.city;
    this.avatar = appUser.avatar;
    this.role = appUser.role;
  }
}
