import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { CreateDocumentDto } from '../../api/dtos/create-document.dto';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async createDocument(tenantId: string, data: CreateDocumentDto, userId: string) {
    if (data.issue_date && data.expiry_date) {
      if (new Date(data.expiry_date) < new Date(data.issue_date)) {
        throw new BadRequestException('Expiry date must be greater than or equal to issue date');
      }
    }

    const categoryId = data.category_id;
    if (!categoryId) {
      throw new BadRequestException('category_id is required');
    }

    const issueDate = data.issue_date ? new Date(data.issue_date) : new Date();
    const expiryDate = data.expiry_date ? new Date(data.expiry_date) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    return this.prisma.$transaction(async (tx) => {
      const doc = await tx.document.create({
        data: {
          title: data.title,
          description: data.description,
          category_id: categoryId,
          issue_date: issueDate,
          expiry_date: expiryDate,
          tenant_id: tenantId,
          status: 'ACTIVE',
          uploaded_by: userId,
        },
      });

      await tx.documentEvent.create({
        data: {
          tenant_id: tenantId,
          document_id: doc.id,
          event_type: 'CREATED_DOCUMENT',
          triggered_by: userId,
        }
      });

      return doc;
    });
  }

  async getDocuments(tenantId: string) {
    return this.prisma.document.findMany({
      where: { tenant_id: tenantId },
      include: { category: true },
      orderBy: { created_at: 'desc' },
    });
  }
}
