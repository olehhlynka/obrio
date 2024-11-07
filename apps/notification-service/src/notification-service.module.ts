import { Module } from '@nestjs/common';
import { NotificationController } from './notification-service.controller';
import { NotificationService } from './notification-service.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'delayed-exchange',
          type: 'x-delayed-message',
          options: {
            arguments: { 'x-delayed-type': 'direct' },
          },
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672', //process.env.RABBITMQ_URI ,
      connectionInitOptions: { wait: true },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationServiceModule {}
