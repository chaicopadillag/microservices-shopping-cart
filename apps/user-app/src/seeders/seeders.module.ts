import { Module } from '@nestjs/common';
import { UserSeedService } from './user-seed/user-seed.service';
import { UserSeedController } from './user-seed/user-seed.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UserSeedService],
  controllers: [UserSeedController],
})
export class SeedersModule {}
