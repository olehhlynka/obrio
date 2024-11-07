import { Injectable } from '@nestjs/common';
import { DbService } from '@obrio/db';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class UserService {
  constructor(
    private readonly db: DbService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async createUser(username: string) {
    const { rows } = await this.db.query<{
      id: string;
      username: string;
    }>(
      `INSERT INTO users (username, created_at) VALUES ($1, NOW()) RETURNING id, username`,
      [username],
    );

    const user = rows[0];

    console.log('HERE', user);

    const a = await this.amqpConnection.publish(
      'delayed-exchange',
      'user.created',
      user,
      {
        headers: { 'x-delay': 10000 },
      },
    );

    // const a = await this.rabbitmqService.sendToQueue('test-queue', {
    //   id: user.id,
    //   createdAt: new Date(),
    // });

    console.log('RES', a);

    return user;
  }
}
