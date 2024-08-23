import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'asdasd') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      plan: { planName: payload.plan.planName },
    };
  }
}
