import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService){}

    @Get('test')
    getTest(){
        return this.userservice.test();
    }
}
