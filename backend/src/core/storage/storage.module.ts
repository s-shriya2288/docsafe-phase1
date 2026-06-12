import { Module, Global } from '@nestjs/common';
import { LocalStorageProvider, StorageService } from './storage.service';

@Global()
@Module({
  providers: [
    LocalStorageProvider,
    StorageService,
  ],
  exports: [
    LocalStorageProvider,
    StorageService,
  ],
})
export class StorageModule {}
