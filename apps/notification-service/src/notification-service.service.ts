import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

import {
  NOTIFICATION_WEBHOOK,
  NOTIFICATIONS_ROUTING_KEY,
} from '@obrio/constants';

interface IUser {
  id: string;
  name: string;
}

@Injectable()
export class NotificationService {
  @RabbitSubscribe({
    exchange: 'delayed-exchange',
    routingKey: NOTIFICATIONS_ROUTING_KEY,
  })
  async handleUserCreated(user: IUser) {
    return axios.post(NOTIFICATION_WEBHOOK, user);
  }
}
