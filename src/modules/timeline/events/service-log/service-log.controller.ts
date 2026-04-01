import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TimelineEventResponseDto } from '@modules/timeline/dto';

import { IsAdmin } from '@common/auth/decorators';
import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { CreateServiceLogDto } from './dto/create-service-log.dto';
import { ServiceLogService } from './service-log.service';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class ServiceLogController {
  constructor(private readonly serviceLogService: ServiceLogService) {}

  @Post('service')
  @IsAdmin()
  @ApiOperation({ summary: 'Add service log (Admin/Owner only)' })
  @ApiOkResponse({ type: TimelineEventResponseDto })
  @ApiCreateTimelineEventResponse()
  create(@Param('vehicleId', ParseUUIDPipe) vehicleId: string, @Body() dto: CreateServiceLogDto) {
    return this.serviceLogService.create(vehicleId, dto);
  }
}
