import { Module } from '@nestjs/common';
import { UserController } from './user-service.controller';
import { UserService } from './user-service.service';
import { DbModule } from '@obrio/db';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqService } from '@orbio/rabbitmq';
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
    DbModule,
    ConfigModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [UserService, RabbitmqService],
})
export class UserServiceModule {}
