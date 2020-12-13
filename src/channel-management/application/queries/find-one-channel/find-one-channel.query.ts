import { ObjectId } from 'mongodb';

export default class FindOneChannelQuery {
  constructor(public readonly channelId: ObjectId) {}
}
