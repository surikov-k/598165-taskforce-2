import * as dayjs from 'dayjs';
import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto';
import {
  CommandEvent,
  JwtPayload,
  Tokens,
  User,
  UserRole,
} from '@task-force/shared-types';
import { RABBITMQ_SERVICE, UserErrorMessage } from './auth.constants';
import { AppUserEntity } from '../app-user/app-user.entity';
import { ConfigService } from '@nestjs/config';
import { AppUserRepository } from '../app-user/app-user.repository';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly appUserRepository: AppUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
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

    this.rabbitClient.emit(
      { cmd: CommandEvent.AddSubscriber },
      {
        email: newUser.email,
        name: newUser.name,
        userId: newUser._id.toString(),
      }
    );

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

    const newDto = {
      ...user,
      ...dto,
      birthDate: dayjs(dto.birthDate).toDate(),
      skills: [],
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
