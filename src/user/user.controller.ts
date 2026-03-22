import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  getTest() {
    return this.userService.test();
  }
  @Get()
  getAllUsers(): IUser[] {
    return this.userService.findAll();
  }
}
