import { ObjectId } from 'mongodb';

export default class TierEmbeddedDTO {
  public readonly id: ObjectId;

  public readonly title: string;

  public readonly price: number;
}