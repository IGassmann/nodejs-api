import { EventBus, ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import ChannelQuery from '../channel.query';
import ChannelDocument from '../../../infrastructure/documents/channel.document';
import FindOneChannelQuery from './find-one-channel.query';

@QueryHandler(FindOneChannelQuery)
export default class FindOneChannelHandler implements ICommandHandler<FindOneChannelQuery> {
  constructor(private readonly eventBus: EventBus, private readonly channelQuery: ChannelQuery) {}

  async execute(findOneChannelQuery: FindOneChannelQuery): Promise<ChannelDocument> {
    return this.channelQuery.findOne(findOneChannelQuery.channelId);
  }
}
