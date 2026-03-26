import { Controller, Delete, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { CurrentSessionId, CurrentUserId } from '@common/auth/decorators';

import { SessionResponseDto } from './dto';
import { SessionService } from './services';
import { toSessionResponseDto } from './session.mapper';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getActiveSessions(
    @CurrentUserId() userId: string,
    @CurrentSessionId() currentSessionId: string,
  ): Promise<SessionResponseDto[]> {
    const sessions = await this.sessionService.findAllActiveByUserId(userId);
    return sessions.map((session) => toSessionResponseDto(session, currentSessionId));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async revokeSession(
    @Param('id') sessionId: string,
    @CurrentUserId() userId: string,
    @CurrentSessionId() currentSessionId: string,
  ): Promise<void> {
    await this.sessionService.revokeById(sessionId, userId, currentSessionId);
  }
}
