import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { CreateUserDto } from './dto/create-user.dto';

//p02
@Injectable()
export class UserService {
  private readonly filePath = path.join(process.cwd(), 'data', 'users.json');
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
  //p04
  findOne(id: string, fields?: string[]) {
    const filepath = path.join(process.cwd(), 'data', 'users.json');
    const users: IUser[] = JSON.parse(
      fs.readFileSync(filepath, 'utf-8'),
    ) as IUser[];
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (fields === undefined) {
      return user;
    }
    // ท่าที่ง่ายกว่า: ใช้ reduce เพื่อเลือกเฉพาะ field ที่ต้องการ
    return fields.reduce((acc, field) => {
      const key = field.trim() as keyof IUser;
      if (user[key] !== undefined) acc[key] = user[key];
      return acc;
    }, {});
  }
  create(dto: CreateUserDto): IUser {
    // 1. อ่านข้อมูลเดิมจากไฟล์
    const fileContent = fs.readFileSync(this.filePath, 'utf-8');
    const users: IUser[] = JSON.parse(fileContent) as IUser[];

    // 2. Generate ID ใหม่ (เอา ID สูงสุด + 1)
    const lastId =
      users.length > 0 ? Math.max(...users.map((u) => parseInt(u.id))) : 0;
    const newId = (lastId + 1).toString();

    // 3. สร้าง User Object ใหม่
    const newUser: IUser = {
      id: newId,
      ...dto,
    };

    // 4. เพิ่มลงใน Array และเขียนลงไฟล์
    users.push(newUser);
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf-8');

    return newUser;
  }
}
