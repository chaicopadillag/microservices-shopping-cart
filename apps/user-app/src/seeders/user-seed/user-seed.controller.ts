import { Controller, Post } from '@nestjs/common';
import { UserSeedService } from './user-seed.service';

@Controller('user-seed')
export class UserSeedController {
  constructor(private readonly userSeedService: UserSeedService) {}

  @Post()
  async seed() {
    return await this.userSeedService.seedUsers();
  }
}
