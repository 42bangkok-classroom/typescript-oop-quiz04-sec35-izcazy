import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'firstName should not be empty' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'lastName should not be empty' })
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  username!: string;
}
