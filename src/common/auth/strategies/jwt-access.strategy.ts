import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AccessTokenPayload } from '@modules/session/types';

import { UnauthorizedException } from '@common/exceptions';

import { ConfigService } from '@config/config.service';

import { AuthenticatedUser } from '../types';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtAccessSecret,
    });
  }

  validate(payload: AccessTokenPayload): AuthenticatedUser {
    if (!payload.sub || !payload.sid || !payload.email) {
      throw new UnauthorizedException();
    }
    return {
      id: payload.sub,
      sessionId: payload.sid,
      email: payload.email,
    };
  }
}
