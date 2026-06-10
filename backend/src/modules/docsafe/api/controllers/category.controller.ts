import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from '../../application/services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { JwtAuthGuard } from '../../../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/auth/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/docsafe/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles('ADMIN')
  async createCategory(@Req() req: any, @Body() body: CreateCategoryDto) {
    const data = await this.categoryService.createCategory(body, req.user.userId);
    return {
      success: true,
      message: 'Category created successfully',
      data,
    };
  }

  @Get()
  @Roles('ADMIN', 'USER', 'AUDITOR')
  async getCategories() {
    const data = await this.categoryService.getCategories();
    return {
      success: true,
      message: 'Categories retrieved successfully',
      data,
    };
  }

  @Put(':id')
  @Roles('ADMIN')
  async updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    const data = await this.categoryService.updateCategory(id, body);
    return {
      success: true,
      message: 'Category updated successfully',
      data,
    };
  }

  @Delete(':id')
  @Roles('ADMIN')
  async deleteCategory(@Param('id') id: string) {
    const data = await this.categoryService.deleteCategory(id);
    return {
      success: true,
      message: 'Category deleted successfully',
      data,
    };
  }
}
