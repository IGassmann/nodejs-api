import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import { MongoModuleOptions, MongoOptionsFactory } from 'nest-mongodb';

@Injectable()
export default class ConfigService extends ConfigManager implements MongoOptionsFactory {
  provideConfigSpec(): Record<string, Record<string, unknown>> {
    return {
      MONGODB_DB_NAME: {
        validate: Joi.string(),
        default: 'nodejsAPI',
        required: true,
      },
      MONGODB_URI: {
        validate: Joi.string().uri({ scheme: ['mongodb', /mongodb\+srv?/] }),
        required: true,
      },
      PORT: {
        validate: Joi.number().min(0).max(65535),
        required: true,
        default: 8080,
      },
    };
  }

  createMongoOptions(): Promise<MongoModuleOptions> | MongoModuleOptions {
    return {
      uri: this.get('MONGODB_URI'),
      dbName: this.get('MONGODB_DB_NAME'),
    };
  }
}
