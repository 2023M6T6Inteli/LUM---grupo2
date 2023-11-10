import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  
  @IsNotEmpty()
  @IsString() 
  role: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
