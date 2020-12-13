import { classToPlain, plainToClass } from 'class-transformer';
import ChannelDTO from '../../application/queries/find-one-channel/channel.dto';
import Channel from '../../domain/channel-aggregate/channel';
import ChannelIcon from '../../domain/channel-aggregate/channel-icon';
import ChannelName from '../../domain/channel-aggregate/channel-name';
import ChannelDocument from '../documents/channel.document';
import TierMapper from './tier.mapper';

export default class ChannelMapper {
  public static toDomain(channelDocument: ChannelDocument): Channel {
    const plainChannel = {
      id: channelDocument._id,
      name: ChannelName.create(channelDocument.name).getValue(),
      categoryId: channelDocument.categoryId,
      ownerId: channelDocument.ownerId,
      icon: channelDocument.icon ? ChannelIcon.create(channelDocument.icon).getValue() : undefined,
      tiers: channelDocument.tiers.map(tierDocument => TierMapper.toDomain(tierDocument)),
      status: channelDocument.status,
    };
    return plainToClass(Channel, plainChannel);
  }

  public static toDocument(channel: Channel): ChannelDocument {
    const plainChannel = classToPlain(channel);
    return {
      _id: plainChannel.id,
      name: plainChannel.name.value,
      categoryId: plainChannel.categoryId,
      ownerId: plainChannel.ownerId,
      icon: plainChannel.icon?.value,
      tiers: plainChannel.tiers.map(tier => TierMapper.toDocument(tier)),
      status: plainChannel.status,
    };
  }

  public static toDTO(channelDocument: ChannelDocument): ChannelDTO {
    return {
      id: channelDocument._id,
      name: channelDocument.name,
      categoryId: channelDocument.categoryId,
      ownerId: channelDocument.ownerId,
      icon: channelDocument.icon,
      tiers: channelDocument.tiers.map(tierDocument => TierMapper.toDTO(tierDocument)),
      status: channelDocument.status,
    };
  }
}
