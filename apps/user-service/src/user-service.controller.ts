import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user-service.service';
import { CreateUserDto } from './items/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto.name);
  }
}
