import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { userRepositoryProvider } from './userRepository.provider';


// módulo que resolve as dependências dos classes que manipulam o banco de dados
@Module({
  providers: [PrismaService, userRepositoryProvider],
  exports: [UserRepository],
})
export class DataModule {}
