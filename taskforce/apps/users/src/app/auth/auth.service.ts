import * as dayjs from 'dayjs';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto';
import { JwtPayload, Tokens, User, UserRole } from '@task-force/shared-types';
import { UserErrorMessage } from './auth.constants';
import { AppUserEntity } from '../app-user/app-user.entity';
import { ConfigService } from '@nestjs/config';
import { AppUserRepository } from '../app-user/app-user.repository';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly appUserRepository: AppUserRepository,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) {}

  public async register(dto: CreateUserDto) {
    const { name, email, password, city, birthDate, role } = dto;

    const appUser = {
      name,
      email,
      passwordHash: '',
      city,
      birthDate: dayjs(birthDate).toDate(),
      role: UserRole[role],
      registeredAt: new Date(),
      refreshTokenHash: '',
    };

    const userEntity = new AppUserEntity(appUser);
    await userEntity.setPassword(password);

    const newUser = await this.appUserRepository.create(userEntity);
    const tokens = await this.getTokens(this.getJwtPayload(newUser));

    await userEntity.setRefreshTokenHash(tokens.refreshToken);

    await this.appUserRepository.update(newUser._id, userEntity);

    return tokens;
  }

  public async verify(dto: LoginUserDto) {
    const { email, password } = dto;
    const existedUser = await this.appUserRepository.findByEmail(email);

    if (!existedUser) {
      throw new UnauthorizedException(UserErrorMessage.NOT_FOUND);
    }

    const appUserEntity = new AppUserEntity(existedUser);
    if (!(await appUserEntity.comparePassword(password))) {
      throw new UnauthorizedException(UserErrorMessage.WRONG_PASSWORD);
    }

    return appUserEntity.toObject();
  }

  public async get(id: string) {
    return this.appUserRepository.findById(id);
  }

  async login(user: User) {
    const userEntity = new AppUserEntity(user);
    const tokens = await this.getTokens(this.getJwtPayload(user));
    await userEntity.setRefreshTokenHash(tokens.refreshToken);

    await this.appUserRepository.update(user._id, userEntity);

    return tokens;
  }

  async logout(userId: string) {
    const user = await this.appUserRepository.findById(userId);
    const newUserEntity = new AppUserEntity(user);
    newUserEntity.clearRefreshTokenHash();

    await this.appUserRepository.update(userId, newUserEntity);
  }

  public async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.appUserRepository.findById(userId);
    const { currentPassword, newPassword } = dto;

    const userEntity = await new AppUserEntity(user);
    const currentPasswordMatches = await userEntity.comparePassword(
      currentPassword
    );
    if (!currentPasswordMatches) {
      throw new ForbiddenException('Access denied');
    }
    await new AppUserEntity(user).setPassword(newPassword);
    return this.appUserRepository.update(userId, userEntity);
  }

  public async update(id: string, dto: UpdateUserDto) {
    const user = await this.appUserRepository.findById(id);
    let skills;

    if (dto.skills) {
      const list = dto.skills.join(',');

      const { data } = await firstValueFrom(
        this.httpService.get(`http://localhost:3334/api/skills?list=${list}`)
      );
      skills = data;
    }

    const newDto = {
      ...user,
      ...dto,
      birthDate: dayjs(dto.birthDate).toDate(),
      skills,
    };
    return this.appUserRepository.update(id, new AppUserEntity(newDto));
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.appUserRepository.findById(userId);
    const userEntity = new AppUserEntity(user);

    if (!user || !user.refreshTokenHash) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await userEntity.compareRefreshToken(
      refreshToken
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(this.getJwtPayload(user));
    await userEntity.setRefreshTokenHash(tokens.refreshToken);
    await this.appUserRepository.update(user._id, userEntity);
    return tokens;
  }

  async getTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.accessTokenSecret'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: '7d',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  getJwtPayload(user: User): JwtPayload {
    return {
      sub: user._id,
      email: user.email,
      name: user.name,
    };
  }
}
