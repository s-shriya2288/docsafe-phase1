import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { TenantContext } from '../../../../core/tenants/tenant.context';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get tenantId(): string {
    const id = TenantContext.tenantId;
    if (!id) {
      throw new UnauthorizedException('Tenant context not found');
    }
    return id;
  }

  async create(data: { name: string; description?: string; created_by: string }): Promise<Category> {
    return this.prisma.category.create({
      data: {
        ...data,
        tenant_id: this.tenantId,
      },
    });
  }

  async findAllActive(): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        tenant_id: this.tenantId,
        is_active: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        id,
        tenant_id: this.tenantId,
      },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        name,
        tenant_id: this.tenantId,
      },
    });
  }

  async update(id: string, data: { name?: string; description?: string; is_active?: boolean }): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id,
        tenant_id: this.tenantId,
      },
      data,
    });
  }

  async softDelete(id: string): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id,
        tenant_id: this.tenantId,
      },
      data: {
        is_active: false,
      },
    });
  }
}
