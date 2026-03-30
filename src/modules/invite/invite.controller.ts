import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IsAdmin } from '@modules/workspace/decorators';
import { IsMember } from '@modules/workspace/decorators';

import { CurrentUserId } from '@common/auth/decorators';
import { Public } from '@common/auth/decorators';
import {
  ApiAcceptInviteResponse,
  ApiCancelInviteResponse,
  ApiGetInvitesResponse,
  ApiRejectInviteResponse,
  ApiSendInviteResponse,
} from '@common/swagger';

import { CreateInviteDto } from './dto';
import { InviteService } from './invite.service';

@ApiTags('Invites')
@Controller('invites')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('workspaces/:workspaceId/invites')
  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'Send workspace invite (Admin/Owner only)' })
  @ApiSendInviteResponse()
  sendInvite(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Body() dto: CreateInviteDto,
    @CurrentUserId() userId: string,
  ) {
    return this.inviteService.sendInvite(workspaceId, dto, userId);
  }

  @Get('workspaces/:workspaceId/invites')
  @ApiBearerAuth()
  @IsMember()
  @ApiOperation({ summary: 'List workspace invites' })
  @ApiGetInvitesResponse()
  getInvites(@Param('workspaceId', ParseUUIDPipe) workspaceId: string) {
    return this.inviteService.getInvites(workspaceId);
  }

  @Delete('workspaces/:workspaceId/invites/:inviteId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'Cancel invite (Admin/Owner only)' })
  @ApiNoContentResponse()
  @ApiCancelInviteResponse()
  async cancelInvite(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('inviteId', ParseUUIDPipe) inviteId: string,
  ) {
    await this.inviteService.cancelInvite(workspaceId, inviteId);
  }

  @Post(':token/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Accept invite (requires JWT — user must be registered)' })
  @ApiNoContentResponse()
  @ApiAcceptInviteResponse()
  async acceptInvite(@Param('token') token: string, @CurrentUserId() userId: string) {
    await this.inviteService.acceptInvite(token, userId);
  }

  @Post(':token/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @ApiOperation({ summary: 'Reject invite (no auth required)' })
  @ApiNoContentResponse()
  @ApiRejectInviteResponse()
  async rejectInvite(@Param('token') token: string) {
    await this.inviteService.rejectInvite(token);
  }
}
