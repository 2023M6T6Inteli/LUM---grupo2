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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created' })
  @Post('/user')
  async createUser(@Body() dto: UserDto): Promise<UserEntity> {
    return await this.service.createUser(dto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @Get('/users')
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.service.findAllUsers();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Return the user with the specified ID' })
  @Get('/user/:id')
  async findUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return await this.service.findUserById(id);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated' })
  @Put('/user/:id')
  async updateUser(
    @Body() dto: UserDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return await this.service.updateUser(dto, id);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted' })
  @Delete('/user/:id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<object> {
    return await this.service.deleteUser(id);
  }
}
