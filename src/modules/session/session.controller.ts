import { Controller, Delete, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentSessionId, CurrentUserId } from '@common/auth/decorators';
import { ApiRevokeSessionResponse, ApiSessionsResponse } from '@common/swagger';

import { SessionResponseDto } from './dto';
import { SessionService } from './services';
import { toSessionResponseDto } from './session.mapper';

@ApiTags('Sessions')
@ApiBearerAuth('access-token')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active sessions' })
  @ApiOkResponse({ type: [SessionResponseDto] })
  @ApiSessionsResponse()
  async getActiveSessions(
    @CurrentUserId() userId: string,
    @CurrentSessionId() currentSessionId: string,
  ): Promise<SessionResponseDto[]> {
    const sessions = await this.sessionService.findAllActiveByUserId(userId);
    return sessions.map((session) => toSessionResponseDto(session, currentSessionId));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke session by id' })
  @ApiNoContentResponse()
  @ApiRevokeSessionResponse()
  async revokeSession(
    @Param('id') sessionId: string,
    @CurrentUserId() userId: string,
    @CurrentSessionId() currentSessionId: string,
  ): Promise<void> {
    await this.sessionService.revokeById(sessionId, userId, currentSessionId);
  }
}
