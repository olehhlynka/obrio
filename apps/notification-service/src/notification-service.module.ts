import { Module } from '@nestjs/common';
import { NotificationController } from './notification-service.controller';
import { NotificationService } from './notification-service.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from '@orbio/rabbitmq';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RabbitmqModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationServiceModule {}
