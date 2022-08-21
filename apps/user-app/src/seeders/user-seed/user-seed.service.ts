import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userSeed } from '../../database/seeds/user.seed';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async seedUsers() {
    try {
      await this.userModel.deleteMany({});
      await this.userModel.create(userSeed);

      return {
        message: 'Users Seeding successfull',
      };
    } catch (error) {
      throw new InternalServerErrorException('Seeding failed');
    }
  }
}
