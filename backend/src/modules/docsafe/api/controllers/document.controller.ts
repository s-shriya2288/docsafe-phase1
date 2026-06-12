import { Controller, Get, Post, Put, Body, Param, Query, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { DocumentService } from '../../application/services/document.service';
import { CreateDocumentDto } from '../dtos/create-document.dto';
import { UpdateDocumentDto } from '../dtos/update-document.dto';
import { DocumentQueryDto } from '../dtos/document-query.dto';
import { JwtAuthGuard } from '../../../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/auth/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/docsafe/documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @Roles('ADMIN', 'USER')
  async createDocument(@Req() req: any, @Body() body: CreateDocumentDto) {
    const data = await this.documentService.createDocument(body, req.user.userId);
    return {
      success: true,
      message: 'Document metadata created successfully',
      data,
    };
  }

  @Get()
  @Roles('ADMIN', 'USER', 'AUDITOR')
  async getDocuments(@Query() query: DocumentQueryDto) {
    const data = await this.documentService.getDocuments(query);
    return {
      success: true,
      message: 'Documents retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @Roles('ADMIN', 'USER', 'AUDITOR')
  async getDocumentById(@Param('id') id: string) {
    const data = await this.documentService.getDocumentById(id);
    return {
      success: true,
      message: 'Document details retrieved successfully',
      data,
    };
  }

  @Put(':id')
  @Roles('ADMIN', 'USER')
  async updateDocument(@Param('id') id: string, @Body() body: UpdateDocumentDto, @Req() req: any) {
    const data = await this.documentService.updateDocument(id, body, req.user.userId);
    return {
      success: true,
      message: 'Document updated successfully',
      data,
    };
  }

  @Post(':id/upload')
  @Roles('ADMIN', 'USER')
  async uploadFile(@Param('id') id: string, @Req() req: any) {
    const file = await req.file();
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const data = await this.documentService.uploadFile(id, file.file, file.filename, req.user.userId);
    return {
      success: true,
      message: 'File uploaded successfully',
      data,
    };
  }

  @Get(':id/history')
  @Roles('ADMIN', 'USER', 'AUDITOR')
  async getDocumentHistory(@Param('id') id: string) {
    const data = await this.documentService.getDocumentHistory(id);
    return {
      success: true,
      message: 'Document history logs retrieved successfully',
      data,
    };
  }
}
