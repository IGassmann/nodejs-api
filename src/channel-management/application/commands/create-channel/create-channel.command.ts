import { ObjectId } from 'mongodb';
import CreateChannelDTO from './create-channel.dto';

export default class CreateChannelCommand {
  constructor(readonly ownerId: ObjectId, readonly createChannelDTO: CreateChannelDTO) {}
}
