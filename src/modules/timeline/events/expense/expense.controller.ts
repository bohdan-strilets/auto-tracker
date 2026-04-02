import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IsAdmin } from '@common/auth/decorators';
import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { ExpenseEventResponseDto } from './dto';
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
  @ApiOkResponse({ type: ExpenseEventResponseDto })
  @ApiCreateTimelineEventResponse()
  create(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: CreateExpenseDto,
  ) {
    return this.expenseService.create(vehicleId, workspaceId, dto);
  }
}
