import { Document } from 'mongoose';
import { City, User, UserRole } from '@task-force/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({collection: 'users'})
export class AppUserModel extends Document implements User {
  @Prop()
  public about: string;

  @Prop()
  public avatar: string;

  @Prop({required: true})
  public birthday: Date;

  @Prop({
    required: true,
    type: String
  })
  public city: City;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({required: true})
  public name: string;

  @Prop({required: true})
  public passwordHash: string;

  @Prop()
  public phone: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Contractor
  })
  public role: UserRole;

  @Prop({required: true})
  public skills: string[];

  @Prop()
  public telegram: string;
}

export const AppUserSchema = SchemaFactory.createForClass(AppUserModel);
