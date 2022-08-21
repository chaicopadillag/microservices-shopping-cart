import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appEnvironment } from '../env/app.environment';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [appEnvironment.KEY],
      useFactory: async (env: ConfigType<typeof appEnvironment>) => ({
        uri: `${env.mongodb.HOST}/${env.mongodb.DBNAME}`,
        useNewUrlParser: true,
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
