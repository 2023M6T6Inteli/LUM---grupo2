import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';


// classe que forma a estratégia de autenticação com google
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '680766650188-77g7rtm8m77gihs283i8a8pkdhs8vno0.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const user = {
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
    };
    return done(null, user);
  }
}
