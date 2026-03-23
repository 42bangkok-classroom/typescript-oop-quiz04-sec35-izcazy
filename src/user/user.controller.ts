import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

//p02
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  getTest() {
    return this.userService.test();
  }
  //p03
  @Get()
  getAllUsers(): IUser[] {
    return this.userService.findAll();
  }
  //p04
  @Get(':id')
  findOne(@Param('id') id: string, @Query('fields') fields?: string) {
    const fieldsArray = fields ? fields.split(',') : undefined;

    return this.userService.findOne(id, fieldsArray);
  }
  //p04
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }
}
