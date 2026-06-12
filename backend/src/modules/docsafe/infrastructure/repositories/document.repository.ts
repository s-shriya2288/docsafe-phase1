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
    return this.prisma.document.create({
      data: {
        ...data,
        tenant_id: tenantId,
      },
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
    file_asset_id?: string;
  }): Promise<Document> {
    const tenantId = this.tenantId;
    return this.prisma.document.update({
      where: {
        id,
        tenant_id: tenantId,
      },
      data,
    });
  }
}
