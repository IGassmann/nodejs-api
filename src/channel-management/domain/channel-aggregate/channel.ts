import { ObjectId } from 'mongodb';
import AggregateRoot from '../../../common/domain/aggregate-root';
import Result from '../../../common/domain/result';
import ChannelName from './channel-name';
import ChannelStatus from './channel-status';
import ChannelIcon from './channel-icon';
import Price from './price';
import Tier from './tier';

export default class Channel extends AggregateRoot<Channel> {
  public name: ChannelName;

  private categoryId: ObjectId;

  private ownerId: ObjectId;

  public icon?: ChannelIcon;

  private tiers: Tier[] = [];

  public status: ChannelStatus;

  public constructor(
    name: ChannelName,
    categoryId: ObjectId,
    ownerId: ObjectId,
  ) {
    super();
    this.name = name;
    this.categoryId = categoryId;
    this.ownerId = ownerId;
    this.status = ChannelStatus.UNPUBLISHED;

    const baseTier = new Tier('Default', new Price(5));
    this.tiers.push(baseTier);
  }

  public addTier(newTier: Tier): void {
    this.tiers.push(newTier);
    this.tiers.sort((tierA, tierB) => tierA.price.valueOf() - tierB.price.valueOf());
  }

  public publish(): Result<Channel> {
    if (this.status !== ChannelStatus.UNPUBLISHED) {
      return Result.fail<Channel>('Channel must be unpublished to be published.');
    }

    if (!this.icon) {
      return Result.fail<Channel>('Channel must have an icon to be published.');
    }

    this.status = ChannelStatus.PUBLISHED;

    return Result.ok<Channel>();
  }
}
