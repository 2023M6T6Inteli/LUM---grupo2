  import { UserDto } from 'src/business/dtos/user.dto';
  import { UserEntity } from 'src/business/entities/user.entity';
  import { PrismaService } from '../prisma.service';
  import { IRepository } from '../../business/repository.impl';
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class UserRepository extends IRepository<UserEntity> {
    constructor(private readonly prisma: PrismaService) {
      super();
    }

    async create(dto: UserDto): Promise<UserEntity> {
      const userCreated = await this.prisma.user.create({
        data: {
          ...dto,
        },
      });
      return userCreated;
    }
    async findAll(): Promise<UserEntity[]> {
      return await this.prisma.user.findMany();
    }
    async findById(id: string): Promise<UserEntity> {
      const userFound = await this.prisma.user.findFirstOrThrow({
        where: {
          id: id,
        },
      });
      return userFound;
    }
    async update(dto: UserDto, id: string): Promise<UserEntity> {
      const userUpdated = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
        },
      });
      return userUpdated;
    }

    async delete(id: string): Promise<object> {
      const userDeleted = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });

      return { userDeleted: !!userDeleted };
    }
  }
