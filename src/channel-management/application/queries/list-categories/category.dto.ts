import { ObjectId } from 'mongodb';

export default class CategoryDTO {
  public readonly id: ObjectId;

  public readonly name: string;
}
