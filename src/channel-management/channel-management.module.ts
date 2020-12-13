import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from 'nest-mongodb';
import CategoriesController from './application/categories.controller';
import ChannelsController from './application/channels.controller';
import CreateChannelHandler from './application/commands/create-channel/create-channel.handler';
import CreateTierHandler from './application/commands/create-tier/create-tier.handler';
import PublishChannelHandler from './application/commands/publish-channel/publish-channel.handler';
import UpdateChannelBrandingHandler from './application/commands/update-channel-branding/update-channel-branding.handler';
import FindOneChannelHandler from './application/queries/find-one-channel/find-one-channel.handler';
import ListCategoriesHandler from './application/queries/list-categories/list-categories.handler';
import ListChannelHandler from './application/queries/list-channels/list-channels.handler';
import TiersController from './application/tiers.controller';
import CategoryQuery from './application/queries/category.query';
import ChannelQuery from './application/queries/channel.query';
import ChannelRepository from './infrastructure/repositories/channel.repository';

@Module({
  imports: [CqrsModule, MongoModule.forFeature(['channels', 'tiers', 'categories'])],
  controllers: [ChannelsController, CategoriesController, TiersController],
  providers: [
    CreateChannelHandler,
    CreateTierHandler,
    PublishChannelHandler,
    UpdateChannelBrandingHandler,
    FindOneChannelHandler,
    ListCategoriesHandler,
    ListChannelHandler,
    ChannelRepository,
    ChannelQuery,
    CategoryQuery,
  ],
})
export default class ChannelManagementModule {}
