import { UserDto } from 'src/business/dtos/user.dto';
import { UserEntity } from 'src/business/entities/user.entity';
import { PrismaService } from '../prisma.service';
import { IRepository } from 'src/business/repository.impl';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends IRepository<UserEntity> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(dto: UserDto): Promise<UserEntity> {
    console.log(dto);
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<UserEntity> {
    console.log(id);

    throw new Error('Method not implemented.');
  }
  async update(dto: UserDto): Promise<UserEntity> {
    console.log(dto);

    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    console.log(id);

    throw new Error('Method not implemented.');
  }
}
