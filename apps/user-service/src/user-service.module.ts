import { Module } from '@nestjs/common';
import { UserController } from './user-service.controller';
import { UserService } from './user-service.service';
import { DbModule } from '@obrio/db';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from '@orbio/rabbitmq';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RabbitmqModule, DbModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserServiceModule {}
