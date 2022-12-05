import { Module } from '@nestjs/common';
import { AppUserMemoryRepository } from './app-user-memory.repository';
import { AppUserRepository } from './app-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AppUserModel, AppUserSchema } from './app-user.model';

@Module({
  imports: [MongooseModule.forFeature([{
    name: AppUserModel.name,
    schema: AppUserSchema
  }])],
  providers: [AppUserRepository],
  exports: [AppUserRepository],
})
export class AppUserModule {}
