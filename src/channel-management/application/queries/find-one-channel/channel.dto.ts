import { ObjectId } from 'mongodb';
import TierEmbeddedDTO from '../list-channels/tier.embedded-dto';

export default class ChannelDTO {
  public readonly id: ObjectId;

  public readonly name: string;

  public readonly categoryId: ObjectId;

  public readonly ownerId: ObjectId;

  public readonly icon: string;

  public readonly tiers: TierEmbeddedDTO[];

  public readonly status: string;
}
