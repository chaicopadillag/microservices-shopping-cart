import { Controller, Get, Param } from '@nestjs/common';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { UsersService } from './users.service';

@Controller({ path: 'users/v1.0', version: 'v1.0' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':idUser')
  async getUserById(@Param('idUser', ParseMongoIdPipe) idUser: string) {
    return await this.usersService.getUserById(idUser);
  }
}
