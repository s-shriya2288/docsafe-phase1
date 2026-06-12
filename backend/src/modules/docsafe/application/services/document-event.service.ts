import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class DocumentEventService {
  constructor(private readonly prisma: PrismaService) {}

  async logEvent(tenantId: string, documentId: string, eventType: string, triggeredBy: string | null, payload?: any) {
    return this.prisma.documentEvent.create({
      data: {
        tenant_id: tenantId,
        document_id: documentId,
        event_type: eventType,
        triggered_by: triggeredBy,
        payload_json: payload || null,
      },
    });
  }

  async getEventsForDocument(tenantId: string, documentId: string) {
    return this.prisma.documentEvent.findMany({
      where: {
        tenant_id: tenantId,
        document_id: documentId,
      },
      orderBy: {
        triggered_at: 'desc',
      },
    });
  }
}
