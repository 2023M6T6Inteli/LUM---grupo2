// auth.service.ts
import { Injectable } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';

@Injectable()
export class AuthService {
  constructor(private readonly googleStrategy: GoogleStrategy) {}

  async googleLogin(req): Promise<any> {
    return await this.googleStrategy.validate(req.query.code, null, null, (err, user) => {
      if (err) {
        throw err;
      }
      return user;
    });
  }
}
