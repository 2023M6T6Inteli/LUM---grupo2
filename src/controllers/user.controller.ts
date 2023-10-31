import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Put,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserDto } from 'src/business/dtos/user.dto';
import { UserEntity } from 'src/business/entities/user.entity';
import { UserService } from 'src/data/services/user.service';

@Controller('/api/v1')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/user')
  async createUser(@Body() dto: UserDto): Promise<UserEntity> {
    return await this.service.createUser(dto);
  }

  @Get('/users')
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.service.findAllUsers();
  }

  @Get('/user/:id')
  async findUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return await this.service.findUserById(id);
  }

  @Put('/user')
  async updateUser(@Body() dto: UserDto): Promise<UserEntity> {
    return await this.service.updateUser(dto);
  }

  @Delete('/user')
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<boolean> {
    return await this.service.deleteUser(id);
  }
}
