import { ObjectId } from 'mongodb';

export default interface CategoryDocument {
  readonly _id: ObjectId;

  readonly name: string;
}
