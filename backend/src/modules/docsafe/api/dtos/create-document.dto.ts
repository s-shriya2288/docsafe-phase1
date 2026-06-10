import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @IsDateString()
  @IsNotEmpty()
  issue_date: string;

  @IsDateString()
  @IsNotEmpty()
  expiry_date: string;

  @IsString()
  @IsOptional()
  visibility_scope?: string;
}
