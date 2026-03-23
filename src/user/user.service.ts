import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

//p02
@Injectable()
export class UserService {
  test() {
    return [];
  }
  //p03
  findAll(): IUser[] {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const users: IUser[] = JSON.parse(fileData) as IUser[];

    return users;
  }
  findOne(id: string, fields?: string[]) {
    const filepath = path.join(process.cwd(), 'data', 'users.json');
    const users: IUser[] = JSON.parse(
      fs.readFileSync(filepath, 'utf-8'),
    ) as IUser[];
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (!fields || fields.length === 0) return user;

    // ท่าที่ง่ายกว่า: ใช้ reduce เพื่อเลือกเฉพาะ field ที่ต้องการ
    return fields.reduce((acc, field) => {
      const key = field.trim() as keyof IUser;
      if (user[key] !== undefined) acc[key] = user[key];
      return acc;
    }, {});
  }
}
