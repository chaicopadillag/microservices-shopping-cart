import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { appEnvironment, appEnvironmentValidate } from './env';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { SeedersModule } from './seeders/seeders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appEnvironment],
      validationSchema: appEnvironmentValidate,
    }),
    DatabaseModule,
    UsersModule,
    CommonModule,
    SeedersModule,
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class UserAppModule {}
