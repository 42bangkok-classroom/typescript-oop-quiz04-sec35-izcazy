import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  getTest() {
    return this.userService.test();
  }
  users() {
    return this.userService.findAll();
  }
  @Get('id')
  findOne(@Param('id') id: string, @Query('file') file?: string) {
    const fileArray = file ? file.split(',') : undefined;
    return this.userService.findOne(id, fileArray);
  }
}
