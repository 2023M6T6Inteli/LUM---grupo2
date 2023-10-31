import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './data/services/user.service';
import { DataModule } from './data/data.module';

@Module({
  imports: [DataModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
