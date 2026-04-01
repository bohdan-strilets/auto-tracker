import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Currency, TimelineEventType } from '@prisma/client';

export class TimelineEventResponseDto {
  @ApiProperty() declare id: string;
  @ApiProperty() declare vehicleId: string;
  @ApiProperty({ enum: TimelineEventType }) declare type: TimelineEventType;
  @ApiProperty() declare title: string;
  @ApiPropertyOptional() declare description?: string;
  @ApiProperty() declare eventDate: Date;
  @ApiPropertyOptional() declare mileage?: number;
  @ApiPropertyOptional() declare cost?: number;
  @ApiPropertyOptional({ enum: Currency }) declare currency?: Currency;
  @ApiProperty() declare createdAt: Date;
  @ApiProperty() declare updatedAt: Date;
}
