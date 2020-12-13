import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import ParseObjectIdPipe from '../../common/pipe/parse-object-id.pipe';
import ChannelDocument from '../infrastructure/documents/channel.document';
import ChannelMapper from '../infrastructure/mappers/channel.mapper';
import CreateChannelCommand from './commands/create-channel/create-channel.command';
import CreateChannelDTO from './commands/create-channel/create-channel.dto';
import PublishChannelCommand from './commands/publish-channel/publish-channel.command';
import UpdateChannelBrandingCommand from './commands/update-channel-branding/update-channel-branding.command';
import UpdateChannelBrandingDTO from './commands/update-channel-branding/update-channel-branding.dto';
import FindOneChannelQuery from './queries/find-one-channel/find-one-channel.query';
import ChannelDTO from './queries/find-one-channel/channel.dto';
import ListChannelsQuery from './queries/list-channels/list-channels.query';

@Controller('channels')
export default class ChannelsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createChannelDTO: CreateChannelDTO): Promise<void> {
    const createChannelCommand = new CreateChannelCommand(new ObjectId(), createChannelDTO);
    await this.commandBus.execute<CreateChannelCommand>(createChannelCommand);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Query() listChannelsQuery: ListChannelsQuery): Promise<ChannelDTO[]> {
    const channelDocuments = await this.queryBus.execute<ListChannelsQuery, ChannelDocument[]>(listChannelsQuery);
    return channelDocuments.map<ChannelDTO>(channel => ChannelMapper.toDTO(channel))
  }

  @Get(':channelId')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('channelId', ParseObjectIdPipe) channelId: ObjectId): Promise<ChannelDTO> {
    const findOneChannelQuery = new FindOneChannelQuery(channelId);
    const channelDocument = await this.queryBus.execute<FindOneChannelQuery, ChannelDocument>(findOneChannelQuery);
    return ChannelMapper.toDTO(channelDocument);
  }

  @Put('/:channelId/branding')
  @HttpCode(HttpStatus.OK)
  async updateBranding(
    @Param('channelId', ParseObjectIdPipe) id: ObjectId,
    @Body() updateChannelBrandingDTO: UpdateChannelBrandingDTO,
  ): Promise<void> {
    const updateChannelBrandingCommand = new UpdateChannelBrandingCommand(
      id,
      updateChannelBrandingDTO,
    );
    await this.commandBus.execute<UpdateChannelBrandingCommand>(updateChannelBrandingCommand);
  }

  @Post('/:id/publishment')
  @HttpCode(HttpStatus.OK)
  async publish(@Param('id', ParseObjectIdPipe) channelId: ObjectId): Promise<void> {
    await this.commandBus.execute<PublishChannelCommand>(new PublishChannelCommand(channelId));
  }
}
