import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import Channel from '../../domain/channel-aggregate/channel';
import ChannelRepositoryInterface from '../../domain/channel-aggregate/channel-repository.interface';
import ChannelMapper from '../mappers/channel.mapper';
import ChannelDocument from '../documents/channel.document';

@Injectable()
export default class ChannelRepository implements ChannelRepositoryInterface {
  constructor(
    @InjectCollection('channels') private readonly channelsCollection: Collection<ChannelDocument>,
  ) {}

  public async findOneById(channelId: ObjectId): Promise<Channel> {
    const channelDocument = await this.channelsCollection.findOne({ _id: channelId });
    if (!channelDocument) return null;
    return ChannelMapper.toDomain(channelDocument);
  }

  public async add(channel: Channel): Promise<void> {
    const channelDocument = ChannelMapper.toDocument(channel);
    await this.channelsCollection.insertOne(channelDocument);
  }

  public async update(channel: Channel): Promise<void> {
    const channelDocument = ChannelMapper.toDocument(channel);
    await this.channelsCollection.replaceOne({ _id: channel.id },channelDocument);
  }

  public async remove(channel: Channel): Promise<void> {
    await this.channelsCollection.deleteOne({ _id: channel.id });
  }
}
