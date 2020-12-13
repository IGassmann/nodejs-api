import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import Price from '../../../domain/channel-aggregate/price';
import Tier from '../../../domain/channel-aggregate/tier';
import CreateTierCommand from './create-tier.command';
import ChannelRepository from '../../../infrastructure/repositories/channel.repository';

@CommandHandler(CreateTierCommand)
export default class CreateTierHandler implements ICommandHandler<CreateTierCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly channelRepository: ChannelRepository,
  ) {}

  async execute({ channelId, createTierDTO }: CreateTierCommand): Promise<void> {
    const price = new Price(createTierDTO.price);
    const newTier = new Tier(createTierDTO.title, price);

    const channel = await this.channelRepository.findOneById(channelId);

    channel.addTier(newTier);

    await this.channelRepository.update(channel);
  }
}
