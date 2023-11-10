import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { userRepositoryProvider } from './userRepository.provider';

@Module({
  providers: [PrismaService, userRepositoryProvider],
  exports: [UserRepository],
})
export class DataModule {}
