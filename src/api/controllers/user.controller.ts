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
import { UserDto } from '../../business/dtos/user.dto';
import { UserEntity } from '../../business/entities/user.entity';
import { UserService } from '../../data/services/user.service';

@Controller()
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

  @Put('/user/:id')
  async updateUser(
    @Body() dto: UserDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return await this.service.updateUser(dto, id);
  }

  @Delete('/user/:id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<object> {
    return await this.service.deleteUser(id);
  }
}
