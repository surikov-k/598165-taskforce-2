import { File } from '@task-force/shared-types';

export class UploadEntity implements File {
  _id?: string;
  filename: string;

  constructor(file: File) {
    this.fillEntity(file);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(file: File) {
    this._id = file._id;
    this.filename = file.filename;
  }
}
