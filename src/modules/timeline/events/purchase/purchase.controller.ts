import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IsAdmin } from '@common/auth/decorators';
import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { PurchaseEventResponseDto } from './dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseService } from './purchase.service';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('purchase')
  @IsAdmin()
  @ApiOperation({ summary: 'Add purchase event (Admin/Owner only)' })
  @ApiOkResponse({ type: PurchaseEventResponseDto })
  @ApiCreateTimelineEventResponse()
  create(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: CreatePurchaseDto,
  ) {
    return this.purchaseService.create(vehicleId, workspaceId, dto);
  }
}
