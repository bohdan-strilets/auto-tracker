import { ApiProperty } from '@nestjs/swagger';

import { TimelineEventType } from '@prisma/client';

import { TimelineEventResponseDto } from '@modules/timeline/dto';

export class PurchaseEventResponseDto extends TimelineEventResponseDto {
  @ApiProperty({ enum: TimelineEventType, example: TimelineEventType.PURCHASE })
  declare type: TimelineEventType;
}
