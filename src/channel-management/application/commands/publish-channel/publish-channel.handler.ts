import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import ChannelRepository from '../../../infrastructure/repositories/channel.repository';
import PublishChannelCommand from './publish-channel.command';

@CommandHandler(PublishChannelCommand)
export default class PublishChannelHandler implements ICommandHandler<PublishChannelCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly channelRepository: ChannelRepository,
  ) {}

  async execute(publishChannelCommand: PublishChannelCommand): Promise<void> {
    const channel = await this.channelRepository.findOneById(publishChannelCommand.channelId)

    if (!channel) throw new BadRequestException('Channel not found');

    const publishResult = channel.publish()

    if (publishResult.isFailure) {
      throw new BadRequestException(publishResult.error.toString());
    }

    await this.channelRepository.update(channel);
  }
}
