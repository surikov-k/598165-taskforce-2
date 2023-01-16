import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto';
import { CheckMongoId } from '../pipes';
import { LoggedUserRdo, TokensRdo, UserRdo } from './rdo';
import { fillObject } from '@task-force/core';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@task-force/shared-types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new user has been successfully created',
  })
  async create(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'A user has been successfully logged in',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or login is incorrect',
  })
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verify(dto);
    return this.authService.login(user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    return this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiResponse({
    type: TokensRdo,
    description: 'Refresh tokens',
  })
  refreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  @ApiResponse({
    type: UserRdo,
    description: 'User is found',
  })
  async show(@Param('id', CheckMongoId) id: string) {
    const existedUser = await this.authService.get(id);
    return fillObject(UserRdo, existedUser);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/profile/:id')
  @ApiResponse({
    type: UserRdo,
    description: 'Update user profile',
  })
  public async update(
    @Param('id', CheckMongoId) id: string,
    @Body() dto: UpdateUserDto
  ) {
    const user = await this.authService.update(id, dto);
    return fillObject(UserRdo, user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/register')
  @ApiResponse({
    type: UserRdo,
    description: 'Update user password',
  })
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req: Request) {
    const user = await this.authService.changePassword(req.user['sub'], dto);
    return fillObject(UserRdo, user);
  }

  @EventPattern({ cmd: CommandEvent.SaveAvatar })
  public async saveAvatar({ name, userId }) {
    return this.authService.saveAvatar(name, userId);
  }
}
