import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import Channel from '../../../domain/channel-aggregate/channel';
import ChannelName from '../../../domain/channel-aggregate/channel-name';
import CreateChannelCommand from './create-channel.command';
import ChannelRepository from '../../../infrastructure/repositories/channel.repository';

@CommandHandler(CreateChannelCommand)
export default class CreateChannelHandler implements ICommandHandler<CreateChannelCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly repository: ChannelRepository,
  ) {}

  async execute({ createChannelDTO, ownerId }: CreateChannelCommand): Promise<void> {
    const newChannelName = ChannelName.create(createChannelDTO.name);
    const newChannel = new Channel(
      newChannelName.getValue(),
      new ObjectId(createChannelDTO.categoryId),
      ownerId,
    );
    await this.repository.add(newChannel);
  }
}
