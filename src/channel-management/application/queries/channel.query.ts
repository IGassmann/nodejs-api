import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import ChannelDocument from '../../infrastructure/documents/channel.document';

@Injectable()
export default class ChannelQuery {
  constructor(
    @InjectCollection('channels') private readonly channelsCollection: Collection<ChannelDocument>,
  ) {}

  public async list(): Promise<ChannelDocument[]> {
    return this.channelsCollection.find().toArray();
  }

  public async findOne(channelId: ObjectId): Promise<ChannelDocument> {
    return this.channelsCollection.findOne({ _id: channelId });
  }
}
