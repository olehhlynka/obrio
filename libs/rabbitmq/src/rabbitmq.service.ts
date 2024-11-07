import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { HOUR_IN_MS, NOTIFICATIONS_ROUTING_KEY } from '@obrio/constants';

@Injectable()
export class RabbitmqService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async onModuleInit() {
    console.log('Connected to the rabbitmq');
  }

  async onModuleDestroy() {
    console.log('Disconnected from the rabbitmq');
  }

  async sendDelayedMessage(
    exchange: string,
    routingKey: string,
    message: unknown,
    delay: number,
  ) {
    return this.amqpConnection.publish(exchange, routingKey, message, {
      headers: {
        'x-delay': delay,
      },
    });
  }

  async sendUserCreatedMessage(user: { id: string; name: string }) {
    return this.amqpConnection.publish(
      'delayed-exchange',
      NOTIFICATIONS_ROUTING_KEY,
      user,
      {
        headers: { 'x-delay': HOUR_IN_MS * 24 },
      },
    );
  }
}
