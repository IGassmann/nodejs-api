import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import Result from '../../../../common/domain/result';
import ChannelIcon from '../../../domain/channel-aggregate/channel-icon';
import ChannelName from '../../../domain/channel-aggregate/channel-name';
import ChannelRepository from '../../../infrastructure/repositories/channel.repository';
import UpdateChannelBrandingCommand from './update-channel-branding.command';
import ChannelBrandingUpdatedEvent from './update-channel-branding.event';

@CommandHandler(UpdateChannelBrandingCommand)
export default class UpdateChannelBrandingHandler
  implements ICommandHandler<UpdateChannelBrandingCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly channelRepository: ChannelRepository,
  ) {}

  async execute(command: UpdateChannelBrandingCommand): Promise<void> {
    const channel = await this.channelRepository.findOneById(command.channelId);

    if (!channel) throw new BadRequestException('Channel not found');

    const nameResult = ChannelName.create(command.updateChannelBrandingDTO.name);
    const iconResult = ChannelIcon.create(command.updateChannelBrandingDTO.icon);

    const result = Result.combine([nameResult, iconResult]);

    if (result.isFailure) throw new BadRequestException(result.error);

    channel.name = nameResult.getValue();
    channel.icon = iconResult.getValue();

    await this.channelRepository.update(channel);

    this.eventBus.publish(new ChannelBrandingUpdatedEvent(channel));
  }
}
