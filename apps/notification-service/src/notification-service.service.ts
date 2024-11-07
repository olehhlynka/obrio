import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  @RabbitSubscribe({
    exchange: 'delayed-exchange',
    routingKey: 'user.created',
    queue: 'test-queue',
  })
  handleUserCreated(data: unknown) {
    console.log(data);
  }
}
