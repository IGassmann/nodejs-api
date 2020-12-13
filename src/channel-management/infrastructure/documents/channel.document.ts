import { ObjectId } from 'mongodb';
import TierEmbeddedDocument from './tier.embedded-document';

export default interface ChannelDocument {
  readonly _id: ObjectId;

  readonly ownerId: ObjectId;

  readonly name: string;

  readonly categoryId: ObjectId;

  readonly icon: string;

  readonly tiers: TierEmbeddedDocument[];

  readonly status: string;
}
