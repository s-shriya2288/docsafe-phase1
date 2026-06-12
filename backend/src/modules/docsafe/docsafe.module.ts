import { Module } from '@nestjs/common';
import { CategoryController } from './api/controllers/category.controller';
import { CategoryService } from './application/services/category.service';
import { CategoryRepository } from './infrastructure/repositories/category.repository';
import { DocumentController } from './api/controllers/document.controller';
import { DocumentService } from './application/services/document.service';
import { DocumentRepository } from './infrastructure/repositories/document.repository';
import { DocumentEventService } from './application/services/document-event.service';
import { StorageModule } from '../../core/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [CategoryController, DocumentController],
  providers: [
    CategoryService,
    CategoryRepository,
    DocumentService,
    DocumentRepository,
    DocumentEventService,
  ],
})
export class DocsafeModule {}
