import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IsAdmin } from '@common/auth/decorators';
import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { SaleEventResponseDto } from './dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleService } from './sale.service';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('sale')
  @IsAdmin()
  @ApiOperation({ summary: 'Add sale event (Admin/Owner only)' })
  @ApiOkResponse({ type: SaleEventResponseDto })
  @ApiCreateTimelineEventResponse()
  create(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: CreateSaleDto,
  ) {
    return this.saleService.create(vehicleId, workspaceId, dto);
  }
}
