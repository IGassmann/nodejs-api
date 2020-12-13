import { ObjectId } from 'mongodb';
import Channel from './channel';

export default interface ChannelRepositoryInterface {
  findOneById(channelId: ObjectId): Promise<Channel>;

  add(channel: Channel): Promise<void>;

  update(channel: Channel): Promise<void>;

  remove(channel: Channel): Promise<void>;
}
