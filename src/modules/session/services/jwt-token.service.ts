import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { TokenService } from '@common/crypto/services';
import { minutesToMs } from '@common/date';
import { daysToMs } from '@common/date/to-ms';

import { ConfigService } from '@config/config.service';

import { AccessTokenPayload, RefreshTokenPayload } from '../types';

@Injectable()
export class JwtTokenService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiresIn: number;
  private readonly refreshExpiresIn: number;

  constructor(
    private readonly jwtService: NestJwtService,
    private readonly tokenService: TokenService,
    private readonly config: ConfigService,
  ) {
    this.accessSecret = this.config.jwtAccessSecret;
    this.refreshSecret = this.config.jwtRefreshSecret;
    this.accessExpiresIn = this.config.jwtAccessExpiresMinutes;
    this.refreshExpiresIn = this.config.jwtRefreshExpiresDays;
  }

  // ─── Access Token ────────────────────────────────────────────────────

  generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.accessSecret,
      expiresIn: `${this.accessExpiresIn}m`,
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return this.jwtService.verify<AccessTokenPayload>(token, {
      secret: this.accessSecret,
    });
  }

  getAccessTokenExpiresAt(): Date {
    const timestamp = Date.now();
    const ms = minutesToMs(this.accessExpiresIn);
    return new Date(timestamp + ms);
  }

  // ─── Refresh Token ───────────────────────────────────────────────────

  generateRefreshToken(payload: RefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: `${this.refreshExpiresIn}d`,
    });
  }

  hashRefreshToken(token: string): string {
    return this.tokenService.hash(token);
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return this.jwtService.verify<RefreshTokenPayload>(token, {
      secret: this.refreshSecret,
    });
  }

  getRefreshTokenExpiresAt(): Date {
    const timestamp = Date.now();
    const ms = daysToMs(this.refreshExpiresIn);
    return new Date(timestamp + ms);
  }
}
