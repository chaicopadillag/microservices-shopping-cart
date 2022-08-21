import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find({
      'auditProperties.activeRecord': true,
    });
  }

  async getUserById(idUser: string): Promise<User> {
    const user = await this.userModel.findOne({
      _id: idUser,
      'auditProperties.activeRecord': true,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
