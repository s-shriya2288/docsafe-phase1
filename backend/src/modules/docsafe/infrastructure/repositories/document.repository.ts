import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { TenantContext } from '../../../../core/tenants/tenant.context';
import { Document, DocumentStatus, Category } from '@prisma/client';

@Injectable()
export class DocumentRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get tenantId(): string {
    const id = TenantContext.tenantId;
    if (!id) {
      throw new UnauthorizedException('Tenant context not found');
    }
    return id;
  }

  async create(data: {
    title: string;
    description?: string;
    category_id: string;
    issue_date: Date;
    expiry_date: Date;
    status: DocumentStatus;
    visibility_scope?: string;
    uploaded_by: string;
  }): Promise<Document> {
    const tenantId = this.tenantId;
    return this.prisma.$transaction(async (tx) => {
      const doc = await tx.document.create({
        data: {
          ...data,
          tenant_id: tenantId,
        },
      });

      await tx.documentEvent.create({
        data: {
          tenant_id: tenantId,
          document_id: doc.id,
          event_type: 'CREATED_DOCUMENT',
          triggered_by: data.uploaded_by,
        },
      });

      return doc;
    });
  }

  async findAll(filter: { status?: DocumentStatus; category_id?: string }): Promise<Document[]> {
    return this.prisma.document.findMany({
      where: {
        tenant_id: this.tenantId,
        ...filter,
      },
      include: {
        category: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string): Promise<(Document & { category: Category }) | null> {
    return this.prisma.document.findFirst({
      where: {
        id,
        tenant_id: this.tenantId,
      },
      include: {
        category: true,
      },
    }) as Promise<(Document & { category: Category }) | null>;
  }

  async update(id: string, data: {
    title?: string;
    description?: string;
    category_id?: string;
    issue_date?: Date;
    expiry_date?: Date;
    status?: DocumentStatus;
    visibility_scope?: string;
  }, userId?: string): Promise<Document> {
    const tenantId = this.tenantId;
    return this.prisma.$transaction(async (tx) => {
      const doc = await tx.document.update({
        where: {
          id,
          tenant_id: tenantId,
        },
        data,
      });

      if (userId) {
        await tx.documentEvent.create({
          data: {
            tenant_id: tenantId,
            document_id: doc.id,
            event_type: 'UPDATED_DOCUMENT',
            triggered_by: userId,
          },
        });
      }

      return doc;
    });
  }
}
