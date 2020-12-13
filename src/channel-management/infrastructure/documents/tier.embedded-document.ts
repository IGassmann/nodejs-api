import { ObjectId } from 'mongodb';


export default interface TierEmbeddedDocument {
  readonly _id: ObjectId;

  readonly title: string;

  readonly price: number;
}