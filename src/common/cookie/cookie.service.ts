import { Injectable } from '@nestjs/common';

import { Response, Request } from 'express';

import { ConfigService } from '@config/config.service';

@Injectable()
export class CookieService {
  private readonly isProduction: boolean;
  private readonly refreshTokenCookieName = 'refresh_token';

  constructor(private readonly config: ConfigService) {
    this.isProduction = this.config.isProduction;
  }

  setRefreshToken(res: Response, refreshToken: string, expiresAt: Date): void {
    res.cookie(this.refreshTokenCookieName, refreshToken, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: this.isProduction ? 'strict' : 'lax',
      expires: expiresAt,
      path: '/',
    });
  }

  clearRefreshToken(res: Response): void {
    res.clearCookie(this.refreshTokenCookieName, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: this.isProduction ? 'strict' : 'lax',
      path: '/',
    });
  }

  getRefreshToken(req: Request): string | null {
    return (req.cookies as Record<string, string>)[this.refreshTokenCookieName] ?? null;
  }
}
