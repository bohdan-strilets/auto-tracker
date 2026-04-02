import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IsAdmin } from '@common/auth/decorators';
import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { ServiceEventResponseDto } from './dto';
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
  @ApiOkResponse({ type: ServiceEventResponseDto })
  @ApiCreateTimelineEventResponse()
  create(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: CreateServiceLogDto,
  ) {
    return this.serviceLogService.create(vehicleId, workspaceId, dto);
  }
}
