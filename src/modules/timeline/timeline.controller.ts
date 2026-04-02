import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { IsAdmin, IsMember } from '@common/auth/decorators';
import {
  ApiDeleteTimelineEventResponse,
  ApiGetTimelineEventResponse,
  ApiGetTimelineResponse,
} from '@common/swagger';

import { TimelineEventResponseDto, TimelineListResponseDto } from './dto';
import { TimelineQueryDto } from './dto/timeline-query.dto';
import { TimelineService } from './timeline.service';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  @IsMember()
  @ApiOperation({ summary: 'Get vehicle timeline' })
  @ApiOkResponse({ type: TimelineListResponseDto })
  @ApiGetTimelineResponse()
  findAll(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Query() query: TimelineQueryDto,
  ) {
    return this.timelineService.findAll(vehicleId, workspaceId, query);
  }

  @Get(':eventId')
  @IsMember()
  @ApiOperation({ summary: 'Get timeline event by ID' })
  @ApiOkResponse({ type: TimelineEventResponseDto })
  @ApiGetTimelineEventResponse()
  findOne(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Param('eventId', ParseUUIDPipe) eventId: string,
  ) {
    return this.timelineService.getOne(eventId, vehicleId, workspaceId);
  }

  @Delete(':eventId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsAdmin()
  @ApiOperation({ summary: 'Delete timeline event (Admin/Owner only)' })
  @ApiNoContentResponse({ description: 'Event deleted' })
  @ApiDeleteTimelineEventResponse()
  async delete(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Param('eventId', ParseUUIDPipe) eventId: string,
  ) {
    await this.timelineService.delete(eventId, vehicleId, workspaceId);
  }
}
