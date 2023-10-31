import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/business/dtos/user.dto';
import { UserEntity } from 'src/business/entities/user.entity';
import { IUserService } from 'src/business/services/user.impl.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService extends IUserService<UserEntity> {
  constructor(private readonly repository: UserRepository) {
    super();
  }

  async createUser(dto: UserDto): Promise<UserEntity> {
    return await this.repository.create(dto);
  }
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.repository.findAll();
  }
  async findUserById(id: string): Promise<UserEntity> {
    return await this.repository.findById(id);
  }
  async updateUser(dto: UserDto): Promise<UserEntity> {
    return await this.repository.update(dto);
  }
  async deleteUser(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
