import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import CategoryDocument from '../../infrastructure/documents/category.document';

@Injectable()
export default class CategoryQuery {
  constructor(
    @InjectCollection('categories') private readonly categoriesCollection: Collection<CategoryDocument>,
  ) {}

  public async list(): Promise<CategoryDocument[]> {
    return this.categoriesCollection.find().toArray();
  }
}
