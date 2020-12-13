import Channel from '../../../domain/channel-aggregate/channel';

export default class ChannelBrandingUpdatedEvent {
  constructor(public readonly updatedChannel: Channel) {}
}
