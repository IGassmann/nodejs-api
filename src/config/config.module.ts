import { Global, Module } from '@nestjs/common';
import { ConfigManagerModule } from '@nestjsplus/config';
import ConfigService from './config.service';

@Global()
@Module({
  imports: [
    ConfigManagerModule.register({
      useFile: '.env',
      allowMissingEnvFile: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export default class ConfigModule {}
