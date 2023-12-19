import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { UserService } from '../data/services/user.service';
import { UserEntity } from '../business/entities/user.entity';
import { UserDto } from '../business/dtos/user.dto';
import * as uuid from 'uuid';

jest.mock('../data/services/user.service');
jest.mock('../data/prisma.service');


// testes de integração da camada de usuário mockado
describe('UserController (e2e)', () => {
    let app: INestApplication;
    let userServiceMock: jest.Mocked<UserService>;
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      userServiceMock = moduleFixture.get<UserService>(UserService) as jest.Mocked<UserService>;
      await app.init();
    });
  
    afterAll(async () => {
      await app.close();
    });
  
    it('/user (POST) - should create a user', async () => {
      // Arrange
      const userDto: UserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'user',
        password: 'password123',
      };
  
      const resolveMockDto: UserEntity = {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        ...userDto,
      };
  
      userServiceMock.createUser.mockResolvedValueOnce(resolveMockDto);
  
      // Act
      const response = await request(app.getHttpServer())
        .post('/user')
        .send(userDto)
        .expect(201);
  
      // Assert
      expect(response.body.id).toEqual(resolveMockDto.id);
      expect(response.body.name).toEqual(resolveMockDto.name);
      // Adicione as demais comparações conforme necessário
    });
  
    it('/users (GET) - should get all users', async () => {
      // Arrange
      const users: UserEntity[] = [];
  
      userServiceMock.findAllUsers.mockResolvedValueOnce(users);
  
      // Act
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);
  
      // Assert
      expect(response.body).toEqual([]);
    });
  
    it('/user/:id (GET) - should get a user by ID', async () => {
      // Arrange
      const userId = uuid.v4();
  
      const resolveMockDto: UserEntity = {
        id: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'user',
        password: 'password123',
      };
  
      userServiceMock.findUserById.mockResolvedValueOnce(resolveMockDto);
  
      // Act
      const response = await request(app.getHttpServer())
        .get(`/user/${userId}`)
        .expect(200);
  
      // Assert
      expect(response.body.id).toEqual(resolveMockDto.id);
      expect(response.body.name).toEqual(resolveMockDto.name);
      // Adicione as demais comparações conforme necessário
    });
  
    it('/user/:id (PUT) - should update a user by ID', async () => {
      // Arrange
      const userId = uuid.v4();
  
      const resolveMockDto: UserEntity = {
        id: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'user',
        password: 'password123',
      };
  
      userServiceMock.updateUser.mockResolvedValueOnce(resolveMockDto);
  
      // Act
      const response = await request(app.getHttpServer())
        .put(`/user/${userId}`)
        .send({
          name: 'Updated Name',
          email: 'updated.email@example.com',
          role: 'user',
          password: 'password123',
        })
        .expect(200);
  
      // Assert
      expect(response.body.id).toEqual(resolveMockDto.id);
      expect(response.body.name).toEqual('John Doe');
      // Adicione as demais comparações conforme necessário
    });
  
    it('/user/:id (DELETE) - should delete a user by ID', async () => {
      // Arrange
      const userId = uuid.v4();
  
      userServiceMock.deleteUser.mockResolvedValueOnce({ userDeleted: true });
  
      // Act
      const response = await request(app.getHttpServer())
        .delete(`/user/${userId}`)
        .expect(200);
  
      // Assert
      expect(response.body).toEqual({ userDeleted: true });
    });
  });
  
