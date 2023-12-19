/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';


// classe de controller para autenticação
@ApiTags('Auth')
@Controller()
export class AuthController {

  // injeção de dependência com a classe de serviços de autenticação
  constructor(private readonly authService: AuthService) {}

  // função que chama a autenticação do google
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}


  // callback que retorna o html com formulário de login com google
  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
