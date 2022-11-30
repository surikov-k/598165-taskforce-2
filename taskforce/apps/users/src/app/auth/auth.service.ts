import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { AppUserMemoryRepository } from '../app-user/app-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@task-force/shared-types';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_WRONG_PASSWORD } from './auth.constants';
import { AppUserEntity } from '../app-user/app-user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly appUserRepository: AppUserMemoryRepository
  ) {
  }

  async register(dto: CreateUserDto) {
    const {
      name,
      email,
      password,
      city,
      birthDate,
      avatar,
      role
    } = dto;

    const appUser = {
      name,
      email,
      passwordHash: '',
      about: '',
      city,
      birthday: dayjs(birthDate).toDate(),
      avatar,
      role: UserRole[role]
    };

    const existedUser = await this.appUserRepository.findByEmail(email);

    if (existedUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await new AppUserEntity(appUser)
      .setPassword(password);

    return this.appUserRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existedUser = await this.appUserRepository.findByEmail(email);

    if (!existedUser) {
      throw new Error(AUTH_USER_NOT_FOUND);
    }

    const appUserEntity = new AppUserEntity(existedUser);
    if (! await appUserEntity.comparePassword(password)) {
      throw new Error(AUTH_USER_WRONG_PASSWORD);
    }

    return appUserEntity.toObject();
  }

  async getUser(id: string) {
    return this.appUserRepository.findById(id);
  }
}
