import { ObjectId } from 'mongodb';

export default class PublishChannelCommand {
  constructor(public readonly channelId: ObjectId) {}
}
