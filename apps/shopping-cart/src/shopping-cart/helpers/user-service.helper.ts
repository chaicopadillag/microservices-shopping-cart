import { Injectable } from '@nestjs/common';
import { User } from 'apps/user-app/src/users/entities/user.entity';
import { AxiosAdapter } from '../../common/adapters/axios.adapter';

@Injectable()
export class UserServiceHelper {
  hostUrl = 'http://localhost:6000/api';
  constructor(private readonly httClient: AxiosAdapter) {}

  async getUserById(idUser: string): Promise<User> {
    const user = await this.httClient.get<User>(
      `${this.hostUrl}/users/v1.0/${idUser}`,
    );

    return user;
  }
}
