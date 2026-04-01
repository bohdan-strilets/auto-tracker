import { ApiProperty } from '@nestjs/swagger';

import { TimelineEventType } from '@prisma/client';

import { TimelineEventResponseDto } from '@modules/timeline/dto';

import { ExpenseResponseDto } from './expense-response.dto';

export class ExpenseEventResponseDto extends TimelineEventResponseDto {
  @ApiProperty({ enum: TimelineEventType, example: TimelineEventType.EXPENSE })
  declare type: TimelineEventType;

  @ApiProperty({ type: ExpenseResponseDto })
  declare expenses: ExpenseResponseDto;
}
