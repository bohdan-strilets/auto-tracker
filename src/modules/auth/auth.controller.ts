import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { Request, Response } from 'express';

import { CurrentSessionId, CurrentUserId, Public } from '@common/auth/decorators';
import { CookieService } from '@common/cookie/cookie.service';
import { DeviceService } from '@common/device/device.service';
import {
  ApiChangeEmailResponse,
  ApiChangePasswordResponse,
  ApiConfirmEmailChangeResponse,
  ApiForgotPasswordResponse,
  ApiLoginResponse,
  ApiLogoutResponse,
  ApiRefreshResponse,
  ApiRegisterResponse,
  ApiResendVerificationResponse,
  ApiResetPasswordResponse,
  ApiVerifyEmailResponse,
} from '@common/swagger';

import { AuthService } from './auth.service';
import {
  AuthResponseDto,
  ChangeEmailDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RefreshResponseDto,
  ResendVerificationDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Throttle({ auth: {} })
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly deviceService: DeviceService,
    private readonly cookieService: CookieService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiRegisterResponse()
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const deviceContext = this.deviceService.extractFromRequest(req);
    const response = await this.authService.register(dto, deviceContext);
    const { accessToken, refreshToken, refreshTokenExpiresAt, user } = response;

    this.cookieService.setRefreshToken(res, refreshToken, refreshTokenExpiresAt);

    return { user, accessToken };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiLoginResponse()
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const deviceContext = this.deviceService.extractFromRequest(req);
    const response = await this.authService.login(dto, deviceContext);
    const { accessToken, refreshToken, refreshTokenExpiresAt, user } = response;

    this.cookieService.setRefreshToken(res, refreshToken, refreshTokenExpiresAt);

    return { user, accessToken };
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCookieAuth('refresh_token')
  @ApiOperation({ summary: 'Logout from current session' })
  @ApiNoContentResponse()
  @ApiLogoutResponse()
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    const refreshToken = this.cookieService.getRefreshToken(req);
    if (refreshToken) await this.authService.logout(refreshToken);
    this.cookieService.clearRefreshToken(res);
  }

  @Public()
  @Post('logout-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCookieAuth('refresh_token')
  @ApiOperation({ summary: 'Logout from all sessions' })
  @ApiNoContentResponse()
  @ApiLogoutResponse()
  async logoutAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    const refreshToken = this.cookieService.getRefreshToken(req);
    if (refreshToken) await this.authService.logoutAll(refreshToken);
    this.cookieService.clearRefreshToken(res);
  }

  @Public()
  @Post('resend-verification')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Resend email verification' })
  @ApiNoContentResponse()
  @ApiResendVerificationResponse()
  async resendVerification(@Body() dto: ResendVerificationDto): Promise<void> {
    await this.authService.resendVerificationEmail(dto.email);
  }

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Verify email address' })
  @ApiNoContentResponse()
  @ApiVerifyEmailResponse()
  async verifyEmail(@Body() dto: VerifyEmailDto): Promise<void> {
    await this.authService.verifyEmail(dto.token);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('refresh_token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ type: RefreshResponseDto })
  @ApiRefreshResponse()
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RefreshResponseDto> {
    const refreshToken = this.cookieService.getRefreshToken(req);

    const response = await this.authService.refresh(refreshToken);
    const { accessToken, refreshToken: newRefreshToken, refreshTokenExpiresAt } = response;

    this.cookieService.setRefreshToken(res, newRefreshToken, refreshTokenExpiresAt);

    return { accessToken };
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiNoContentResponse()
  @ApiForgotPasswordResponse()
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<void> {
    await this.authService.forgotPassword(dto.email);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiNoContentResponse()
  @ApiResetPasswordResponse()
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    await this.authService.resetPassword(dto.token, dto.password);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Change password' })
  @ApiNoContentResponse()
  @ApiChangePasswordResponse()
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @CurrentUserId() userId: string,
    @CurrentSessionId() sessionId: string,
  ): Promise<void> {
    await this.authService.changePassword(userId, dto.currentPassword, dto.newPassword, sessionId);
  }

  @Post('change-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Request email change' })
  @ApiNoContentResponse()
  @ApiChangeEmailResponse()
  async changeEmail(@Body() dto: ChangeEmailDto, @CurrentUserId() userId: string): Promise<void> {
    await this.authService.changeEmail(userId, dto.newEmail, dto.password);
  }

  @Public()
  @Post('confirm-email-change')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Confirm email change using token' })
  @ApiNoContentResponse()
  @ApiConfirmEmailChangeResponse()
  async confirmEmailChange(@Body() dto: VerifyEmailDto): Promise<void> {
    await this.authService.confirmEmailChange(dto.token);
  }
}
