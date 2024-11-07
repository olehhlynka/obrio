import { Global, Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'delayed-exchange',
            type: 'x-delayed-message',
            options: {
              arguments: { 'x-delayed-type': 'direct' },
            },
          },
        ],
        uri: configService.get<string>('RABBITMQ_URI'),
        connectionInitOptions: { wait: true },
      }),
    }),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
