import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from '../../infrastructure/repositories/document.repository';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CreateDocumentDto } from '../../api/dtos/create-document.dto';
import { UpdateDocumentDto } from '../../api/dtos/update-document.dto';
import { DocumentQueryDto } from '../../api/dtos/document-query.dto';
import { DocumentStatus } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly categoryRepository: CategoryRepository,
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

  async createDocument(data: CreateDocumentDto, userId: string) {
    const issueDate = new Date(data.issue_date);
    const expiryDate = new Date(data.expiry_date);

    if (expiryDate < issueDate) {
      throw new BadRequestException('Expiry date must be greater than or equal to issue date');
    }

    // Tenant check: Verify category_id belongs to the tenant
    const category = await this.categoryRepository.findById(data.category_id);
    if (!category) {
      throw new BadRequestException('Category not found or does not belong to this tenant');
    }

    // Status Engine calculation
    const status = this.computeStatus(expiryDate);

    return this.documentRepository.create({
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      issue_date: issueDate,
      expiry_date: expiryDate,
      status,
      visibility_scope: data.visibility_scope,
      uploaded_by: userId,
    });
  }

  async getDocuments(query: DocumentQueryDto) {
    return this.documentRepository.findAll(query);
  }

  async getDocumentById(id: string) {
    const doc = await this.documentRepository.findById(id);
    if (!doc) {
      throw new NotFoundException('Document not found');
    }
    return doc;
  }

  async updateDocument(id: string, data: UpdateDocumentDto, userId: string) {
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

    // Recompute status if expiry date has changed, and user has not passed explicit status
    if (data.expiry_date && !data.status) {
      updatedData.status = this.computeStatus(expiryDate);
    }

    return this.documentRepository.update(id, updatedData, userId);
  }
}
