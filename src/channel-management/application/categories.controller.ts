import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import ChannelDocument from '../infrastructure/documents/channel.document';
import CategoryMapper from '../infrastructure/mappers/category.mapper';
import CategoryDTO from './queries/list-categories/category.dto';
import ListCategoriesQuery from './queries/list-categories/list-categories.query';

@Controller('categories')
export default class CategoriesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(
    @Query() listChannelsQuery: ListCategoriesQuery,
  ): Promise<CategoryDTO[]> {
    const categoryDocuments = await this.queryBus.execute<ListCategoriesQuery, ChannelDocument[]>(listChannelsQuery);
    return categoryDocuments.map<CategoryDTO>(category => CategoryMapper.toDTO(category))
  }
}
