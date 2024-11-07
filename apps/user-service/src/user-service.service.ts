import { Injectable } from '@nestjs/common';
import { DbService } from '@obrio/db';
import { RabbitmqService } from '@orbio/rabbitmq';

@Injectable()
export class UserService {
  constructor(
    private readonly db: DbService,
    private readonly queue: RabbitmqService,
  ) {}

  async createUser(name: string) {
    const user = await this.db.insertUser(name);

    await this.queue.sendUserCreatedMessage(user);

    return user;
  }
}
