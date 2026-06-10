import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CreateCategoryDto } from '../../api/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../api/dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(data: CreateCategoryDto, createdBy: string) {
    const existing = await this.categoryRepository.findByName(data.name);
    if (existing) {
      throw new ConflictException(`Category with name "${data.name}" already exists`);
    }

    return this.categoryRepository.create({
      name: data.name,
      description: data.description,
      created_by: createdBy,
    });
  }

  async getCategories() {
    return this.categoryRepository.findAllActive();
  }

  async updateCategory(id: string, data: UpdateCategoryDto) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }

    if (data.name && data.name !== category.name) {
      const existing = await this.categoryRepository.findByName(data.name);
      if (existing) {
        throw new ConflictException(`Category with name "${data.name}" already exists`);
      }
    }

    return this.categoryRepository.update(id, data);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
    return this.categoryRepository.softDelete(id);
  }
}
