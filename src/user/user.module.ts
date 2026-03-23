import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

//p02
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
