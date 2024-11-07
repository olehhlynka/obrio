import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user-service.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body('username') username: string) {
    return this.userService.createUser(username);
  }
}
