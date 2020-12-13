import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import ParseObjectIdPipe from '../../common/pipe/parse-object-id.pipe';
import CreateTierCommand from './commands/create-tier/create-tier.command';
import CreateTierDTO from './commands/create-tier/create-tier.dto';

@Controller('channels/:channelId/tiers')
export default class TiersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTierDTO: CreateTierDTO,
    @Param('channelId', ParseObjectIdPipe) channelId: ObjectId,
  ): Promise<void> {
    const createTierCommand = new CreateTierCommand(channelId, createTierDTO);
    await this.commandBus.execute<CreateTierCommand>(createTierCommand);
  }
}
