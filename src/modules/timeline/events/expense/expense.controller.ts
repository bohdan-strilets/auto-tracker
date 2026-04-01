import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TimelineEventResponseDto } from '@modules/timeline/dto';

import { IsAdmin } from '@common/auth/decorators';
import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseService } from './expense.service';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('expense')
  @IsAdmin()
  @ApiOperation({ summary: 'Add expense (Admin/Owner only)' })
  @ApiOkResponse({ type: TimelineEventResponseDto })
  @ApiCreateTimelineEventResponse()
  create(@Param('vehicleId', ParseUUIDPipe) vehicleId: string, @Body() dto: CreateExpenseDto) {
    return this.expenseService.create(vehicleId, dto);
  }
}
