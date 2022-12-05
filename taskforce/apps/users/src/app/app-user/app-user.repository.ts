import { CRUDRepository } from '@task-force/core';
import { AppUserEntity } from './app-user.entity';
import { User } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppUserModel } from './app-user.model';
import { Model } from 'mongoose';

@Injectable()
export class AppUserRepository implements CRUDRepository<AppUserEntity, string, User> {
  constructor(
    @InjectModel(AppUserModel.name) private readonly appUserModel: Model<AppUserModel>
  ) {}

  public async create(item: AppUserEntity): Promise<User> {
    const user = new this.appUserModel(item);
    return user.save();
  }

  public async destroy(id: string): Promise<void> {
     this.appUserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.appUserModel.findOne({id}).exec();
  }

  public async update(id: string, item: AppUserEntity): Promise<User> {
    return this.appUserModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.appUserModel.findOne({ email }).exec();
  }

}
