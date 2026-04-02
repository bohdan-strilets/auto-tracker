import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IsAdmin } from '@common/auth/decorators';
import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { FuelEventResponseDto } from './dto';
import { CreateFuelLogDto } from './dto/create-fuel-log.dto';
import { FuelLogService } from './fuel-log.service';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class FuelLogController {
  constructor(private readonly fuelLogService: FuelLogService) {}

  @Post('fuel')
  @IsAdmin()
  @ApiOperation({ summary: 'Add fuel log (Admin/Owner only)' })
  @ApiOkResponse({ type: FuelEventResponseDto })
  @ApiCreateTimelineEventResponse()
  create(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: CreateFuelLogDto,
  ) {
    return this.fuelLogService.create(vehicleId, workspaceId, dto);
  }
}
