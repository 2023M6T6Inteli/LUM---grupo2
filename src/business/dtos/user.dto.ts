import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: "user name",
    example: "yago araújo",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "user email",
    example: "yagoaraujo19@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "user acess",
    example: "SEDUC employee",
  })
  @IsNotEmpty()
  @IsString() 
  role: string;

  @ApiProperty({
    description: "user strong password",
    example: "UmaSen!For12@",
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
