import { EventBus, ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import ChannelQuery from '../channel.query';
import ChannelDocument from '../../../infrastructure/documents/channel.document';
import ListChannelsQuery from './list-channels.query';

@QueryHandler(ListChannelsQuery)
export default class ListChannelHandler implements ICommandHandler<ListChannelsQuery> {
  constructor(private readonly eventBus: EventBus, private readonly channelQuery: ChannelQuery) {}

  async execute(): Promise<ChannelDocument[]> {
    return this.channelQuery.list();
  }
}
