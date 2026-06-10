import { IsOptional, IsEnum, IsUUID } from 'class-validator';
import { DocumentStatus } from '@prisma/client';

export class DocumentQueryDto {
  @IsEnum(DocumentStatus)
  @IsOptional()
  status?: DocumentStatus;

  @IsUUID()
  @IsOptional()
  category_id?: string;
}
