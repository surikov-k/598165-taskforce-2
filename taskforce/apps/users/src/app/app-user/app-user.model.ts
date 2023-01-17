import { Document } from 'mongoose';
import { City, Skill, User, UserRole } from '@task-force/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class AppUserModel extends Document implements User {
  @Prop()
  public about: string;

  @Prop()
  public avatar: string;

  @Prop()
  public rating: number;

  @Prop({ required: true })
  public birthDate: Date;

  @Prop({
    required: true,
    type: String,
  })
  public city: City;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop()
  public refreshTokenHash: string;

  @Prop()
  public phone: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
  })
  public role: UserRole;

  @Prop()
  public skills: Skill[];

  @Prop()
  public telegram: string;

  @Prop({
    required: true,
    default: new Date(),
  })
  registeredAt: Date;
}

export const AppUserSchema = SchemaFactory.createForClass(AppUserModel);
