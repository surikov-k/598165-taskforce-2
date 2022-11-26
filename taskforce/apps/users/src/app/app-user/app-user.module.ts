import { Module } from '@nestjs/common';
import { AppUserMemoryRepository } from './app-user-memory.repository';

@Module({
  providers: [AppUserMemoryRepository],
  exports: [AppUserMemoryRepository],
})
export class AppUserModule {}
