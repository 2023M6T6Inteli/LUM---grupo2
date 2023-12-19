// app/app.module.ts
import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { UserController } from './api/controllers/user.controller';
import { UserService } from './data/services/user.service';
import { AuthModule } from './api/auth/auth.module';


// módulo que junta todos os submódulos da aplicação e os inicia
@Module({
  imports: [DataModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
