import { EventBus, ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import CategoryDocument from '../../../infrastructure/documents/category.document';
import CategoryQuery from '../category.query';
import ListCategoriesQuery from './list-categories.query';

@QueryHandler(ListCategoriesQuery)
export default class ListCategoriesHandler implements ICommandHandler<ListCategoriesQuery> {
  constructor(private readonly eventBus: EventBus, private readonly categoryQuery: CategoryQuery) {}

  async execute(): Promise<CategoryDocument[]> {
    return this.categoryQuery.list();
  }
}
