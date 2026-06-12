import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DocumentRepository } from '../../infrastructure/repositories/document.repository';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { DocumentEventService } from './document-event.service';
import { LocalStorageProvider } from '../../../../core/storage/storage.service';
import { TenantContext } from '../../../../core/tenants/tenant.context';
import { DocumentStatus } from '@prisma/client';
import { Readable } from 'stream';

@Injectable()
export class DocumentService {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly documentEventService: DocumentEventService,
    private readonly localStorageProvider: LocalStorageProvider,
  ) {}

  private computeStatus(expiryDate: Date, currentDate: Date = new Date()): DocumentStatus {
    const diffTime = expiryDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return DocumentStatus.EXPIRED;
    } else if (diffDays <= 30) {
      return DocumentStatus.EXPIRING_SOON;
    } else {
      return DocumentStatus.ACTIVE;
    }
  }

  async createDocument(data: any, userId: string) {
    const issueDate = new Date(data.issue_date);
    const expiryDate = new Date(data.expiry_date);

    if (expiryDate < issueDate) {
      throw new BadRequestException('Expiry date must be greater than or equal to issue date');
    }

    const category = await this.categoryRepository.findById(data.category_id);
    if (!category) {
      throw new BadRequestException('Category not found or does not belong to this tenant');
    }

    const status = this.computeStatus(expiryDate);

    const doc = await this.documentRepository.create({
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      issue_date: issueDate,
      expiry_date: expiryDate,
      status,
      visibility_scope: data.visibility_scope,
      uploaded_by: userId,
    });

    const tenantId = TenantContext.tenantId;
    if (!tenantId) {
      throw new UnauthorizedException('Tenant context not found');
    }

    await this.documentEventService.logEvent(
      tenantId,
      doc.id,
      'DOCUMENT_CREATED',
      userId,
      {
        title: doc.title,
        description: doc.description,
        category_id: doc.category_id,
        issue_date: doc.issue_date,
        expiry_date: doc.expiry_date,
        status: doc.status,
      }
    );

    return doc;
  }

  async getDocuments(query: any) {
    return this.documentRepository.findAll(query);
  }

  async getDocumentById(id: string) {
    const doc = await this.documentRepository.findById(id);
    if (!doc) {
      throw new NotFoundException('Document not found');
    }
    return doc;
  }

  async updateDocument(id: string, data: any, userId: string) {
    const doc = await this.documentRepository.findById(id);
    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    const updatedData: any = { ...data };

    if (data.category_id) {
      const category = await this.categoryRepository.findById(data.category_id);
      if (!category) {
        throw new BadRequestException('Category not found or does not belong to this tenant');
      }
    }

    const issueDate = data.issue_date ? new Date(data.issue_date) : doc.issue_date;
    const expiryDate = data.expiry_date ? new Date(data.expiry_date) : doc.expiry_date;

    if (data.issue_date || data.expiry_date) {
      if (expiryDate < issueDate) {
        throw new BadRequestException('Expiry date must be greater than or equal to issue date');
      }
      updatedData.issue_date = issueDate;
      updatedData.expiry_date = expiryDate;
    }

    if (data.expiry_date && !data.status) {
      updatedData.status = this.computeStatus(expiryDate);
    }

    const changes: any = {};
    for (const key of Object.keys(data)) {
      if (data[key] !== (doc as any)[key]) {
        changes[key] = { old: (doc as any)[key], new: data[key] };
      }
    }

    const updatedDoc = await this.documentRepository.update(id, updatedData);

    const tenantId = TenantContext.tenantId;
    if (!tenantId) {
      throw new UnauthorizedException('Tenant context not found');
    }

    if (Object.keys(changes).length > 0) {
      await this.documentEventService.logEvent(
        tenantId,
        updatedDoc.id,
        'DOCUMENT_UPDATED',
        userId,
        changes
      );
    }

    return updatedDoc;
  }

  async uploadFile(id: string, fileStream: Readable, filename: string, userId: string) {
    const doc = await this.documentRepository.findById(id);
    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    const { fileAssetId } = await this.localStorageProvider.uploadFile(fileStream, filename);

    const updatedDoc = await this.documentRepository.update(id, {
      file_asset_id: fileAssetId,
      status: DocumentStatus.ACTIVE,
    });

    const tenantId = TenantContext.tenantId;
    if (!tenantId) {
      throw new UnauthorizedException('Tenant context not found');
    }

    await this.documentEventService.logEvent(
      tenantId,
      doc.id,
      'FILE_UPLOADED',
      userId,
      { file_asset_id: fileAssetId }
    );

    return updatedDoc;
  }

  async getDocumentHistory(id: string) {
    const doc = await this.documentRepository.findById(id);
    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    const tenantId = TenantContext.tenantId;
    if (!tenantId) {
      throw new UnauthorizedException('Tenant context not found');
    }

    return this.documentEventService.getEventsForDocument(tenantId, id);
  }
}
