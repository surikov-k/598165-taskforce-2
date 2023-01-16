import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { File } from '@task-force/shared-types';

@Schema({
  collection: 'files',
  timestamps: true,
})
export class UploadModel extends Document implements File {
  @Prop({ required: true })
  public filename: string;
}

export const UploadSchema = SchemaFactory.createForClass(UploadModel);
