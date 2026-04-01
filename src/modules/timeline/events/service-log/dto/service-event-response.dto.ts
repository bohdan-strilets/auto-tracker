import { ApiProperty } from '@nestjs/swagger';

import { TimelineEventType } from '@prisma/client';

import { TimelineEventResponseDto } from '@modules/timeline/dto';

import { ServiceLogResponseDto } from './service-log-response.dto';

export class ServiceEventResponseDto extends TimelineEventResponseDto {
  @ApiProperty({ enum: TimelineEventType, example: TimelineEventType.SERVICE })
  declare type: TimelineEventType;

  @ApiProperty({ type: ServiceLogResponseDto })
  declare serviceLogs: ServiceLogResponseDto;
}
