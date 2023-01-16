import { CRUDRepository } from '@task-force/core';
import { UploadEntity } from './upload.entity';
import { File } from '@task-force/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { UploadModel } from './upload.model';
import { Model } from 'mongoose';

export class UploadRepository
  implements CRUDRepository<UploadEntity, string, File>
{
  constructor(
    @InjectModel(UploadModel.name)
    private readonly uploadModel: Model<UploadModel>
  ) {}

  public async create(item: UploadEntity): Promise<File> {
    const upload = new this.uploadModel(item);
    return upload.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.uploadModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<File | null> {
    return this.uploadModel.findOne({ id }).exec();
  }

  public async findByName(name: string) {
    return this.uploadModel.findOne({ name }).exec();
  }
}
