import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification-service.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('user_created')
  handleUserCreated(@Payload() data: { userId: number; createdAt: Date }) {
    return this.notificationService.handleUserCreated(data);
  }
}
