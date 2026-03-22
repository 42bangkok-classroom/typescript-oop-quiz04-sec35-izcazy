import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

@Injectable()
export class UserService {
  test() {
    return [];
  }

  async findAll(): IUser[] {}
  findOne(id: string, file?: string[]){
    const filepath = path.join(process.cwd(), 'data', 'user.json');
    const users: IUser[] = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    const user = users.find((u) => u.id === id);

    if(!user){
      throw new NotFoundException('user not found');
    }
    if (file) {
      // ระบุ Type ให้ชัดเจนว่าเป็น Partial<IUser> เพื่อแก้ Error ลินเตอร์
      const filteredUser: Partial<IUser> = {};
      file.forEach((field) => {
        const key = field as keyof IUser;
        if (user[key] !== undefined) {
          filteredUser[key] = user[key];
        }
      });
      return filteredUser;
    }
    return user;
  }
}
