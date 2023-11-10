import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from 'src/business/dtos/user.dto';
import { UserEntity } from 'src/business/entities/user.entity';
import { PrismaService } from '../data/prisma.service';
import { UserRepository } from '../data/repositories/user.repository';
import * as uuid from 'uuid';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let prismaService: PrismaService;

  // setup
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirstOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      // arrange
      const userDto: UserDto = {
        name: 'yago',
        email: 'yagoaraujo398@gmail.com',
        role: 'employe seduc',
        password: 'Araujo123@',
      };
      const userEntity: UserEntity = {
        id: uuid.v4(),
        name: 'yago',
        role: 'employe seduc',
        email: 'yagoaraujo398@gmail.com',
        password: 'Araujo123@',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      // act
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValueOnce(userEntity);

      const result = await userRepository.create(userDto);

      // assert
      expect(result).toEqual(userEntity);
    });

    it('should handle errors during user creation', async () => {
      // arrange
      const userDto: UserDto = {
        name: 'yago',
        email: 'yagoaraujo',
        role: 'employe seduc',
        password: 'Araujo123@',
      };
      // act
      jest
        .spyOn(prismaService.user, 'create')
        .mockRejectedValueOnce(new Error('Creation error'));

      // assert
      await expect(userRepository.create(userDto)).rejects.toThrowError(
        'Creation error',
      );
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      // arrange
      const users: UserEntity[] = [];

      // act
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValueOnce(users);

      const result = await userRepository.findAll();

      // assert
      expect(result).toEqual(users);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // arrange
      const userId = uuid.v4();
      const userDto: UserDto = {
        name: 'yago araújo',
        email: 'yagoaraujo398@gmail.com',
        role: 'employe seduc',
        password: 'Araujo123@',
      };
      const updatedUser: UserEntity = {
        id: uuid.v4(),
        name: 'yago araújo',
        role: 'employe seduc',
        email: 'yagoaraujo398@gmail.com',
        password: 'Araujo123@',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      // act
      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValueOnce(updatedUser);

      const result = await userRepository.update(userDto, userId);

      // assert
      expect(result).toEqual(updatedUser);
    });

    it('should handle errors during user update', async () => {
      // arrange
      const userId = 'fiwejoiewjfoiwejffwoi';
      const userDto: UserDto = {
        name: 'yago araújo',
        email: 'yagoaraujo398@gmail.com',
        role: 'employe seduc',
        password: 'Araujo123@',
      };

      // act
      jest
        .spyOn(prismaService.user, 'update')
        .mockRejectedValueOnce(new Error('Update error'));

      // assert
      await expect(userRepository.update(userDto, userId)).rejects.toThrowError(
        'Update error',
      );
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      // arrange
      const userId = uuid.v4();

      // act
      jest.spyOn(prismaService.user, 'delete').mockResolvedValueOnce({
        id: userId,
        name: 'exampleName',
        role: 'exampleRole',
        email: 'example@example.com',
        password: 'examplePassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      });

      const result = await userRepository.delete(userId);

      // assert
      expect(result).toEqual({ userDeleted: true });
    });
  });
});
