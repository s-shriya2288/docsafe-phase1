import { Module } from '@nestjs/common';
import { CategoryController } from './api/controllers/category.controller';
import { CategoryService } from './application/services/category.service';
import { CategoryRepository } from './infrastructure/repositories/category.repository';
import { DocumentController } from './api/controllers/document.controller';
import { DocumentService } from './application/services/document.service';
import { DocumentRepository } from './infrastructure/repositories/document.repository';

@Module({
  imports: [],
  controllers: [CategoryController, DocumentController],
  providers: [
    CategoryService,
    CategoryRepository,
    DocumentService,
    DocumentRepository,
  ],
})
export class DocsafeModule {}
