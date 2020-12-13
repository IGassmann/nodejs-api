import { ObjectId } from 'mongodb';
import UpdateChannelBrandingDTO from './update-channel-branding.dto';

export default class UpdateChannelBrandingCommand {
  constructor(
    public readonly channelId: ObjectId,
    public readonly updateChannelBrandingDTO: UpdateChannelBrandingDTO,
  ) {}
}
