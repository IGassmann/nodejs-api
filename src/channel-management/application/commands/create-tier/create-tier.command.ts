import { ObjectId } from 'mongodb';
import CreateTierDTO from './create-tier.dto';

export default class CreateTierCommand {
  constructor(public readonly channelId: ObjectId, public readonly createTierDTO: CreateTierDTO) {}
}
