import { ApiProperty } from '@nestjs/swagger';

import { TimelineEventType } from '@prisma/client';

import { TimelineEventResponseDto } from '@modules/timeline/dto';

import { FuelLogResponseDto } from './fuelLog-response.dto';

export class FuelEventResponseDto extends TimelineEventResponseDto {
  @ApiProperty({ enum: TimelineEventType, example: TimelineEventType.FUEL })
  declare type: TimelineEventType;

  @ApiProperty({ type: FuelLogResponseDto })
  declare fuelLogs: FuelLogResponseDto;
}
