import { Module } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import ChannelManagementModule from './channel-management/channel-management.module';
import ConfigModule from './config/config.module';
import ConfigService from './config/config.service';

@Module({
  imports: [
    ChannelManagementModule,
    ConfigModule,
    MongoModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
  ],
})
export default class AppModule {}
