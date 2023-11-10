// app/app.module.ts
import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { UserController } from './api/controllers/user.controller';
import { UserService } from './data/services/user.service';

@Module({
  imports: [DataModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
