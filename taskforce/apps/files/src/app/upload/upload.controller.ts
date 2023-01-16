import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Get,
  Header,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { AccessTokenGuard } from '../../../guards/access-token.guard';
import { diskStorage } from 'multer';
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  UPLOAD_DIRECTORY,
} from './upload.constants';
import { createReadStream } from 'fs';
import * as path from 'path';
import { CheckMongoId } from './pipes';

@Controller('upload')
export class UploadController {
  private static parseFilePipeOptions = {
    validators: [
      new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
      new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
    ],
  };

  constructor(private readonly uploadService: UploadService) {}

  private static generateUploadFileName = (req, file, cb) => {
    const newName = `${Date.now()}.${file.originalname}`;
    cb(null, newName);
  };

  private static fileInterceptorOptions = {
    storage: diskStorage({
      destination: UPLOAD_DIRECTORY,
      filename: UploadController.generateUploadFileName,
    }),
  };

  @UseGuards(AccessTokenGuard)
  @Post('task/:id')
  @UseInterceptors(
    FileInterceptor('file', UploadController.fileInterceptorOptions)
  )
  public async saveTaskFile(
    @UploadedFile(new ParseFilePipe(UploadController.parseFilePipeOptions))
    { filename }: Express.Multer.File,
    @Param('id') taskId: number,
    @Req() req: Request
  ) {
    const userId = req.user['sub'];
    return this.uploadService.saveTaskFile({
      taskId,
      filename,
      userId,
    });
  }

  @UseGuards(AccessTokenGuard)
  @Post('avatar/:id')
  @UseInterceptors(
    FileInterceptor('file', UploadController.fileInterceptorOptions)
  )
  public async saveAvatarFile(
    @UploadedFile(new ParseFilePipe(UploadController.parseFilePipeOptions))
    { filename }: Express.Multer.File,
    @Param('id', CheckMongoId) userId: string,
    @Req() req: Request
  ) {
    if (userId !== req.user['sub']) {
      throw new BadRequestException('Wrong User');
    }
    return this.uploadService.saveAvatarFile({ userId, filename });
  }

  @Get(':filename')
  @Header('Content-Type', 'Binary')
  getFile(@Param('filename') filename: string) {
    const file = createReadStream(
      path.join(process.cwd(), `${UPLOAD_DIRECTORY}/${filename}`)
    );
    return new StreamableFile(file);
  }
}
