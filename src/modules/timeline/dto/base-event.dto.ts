import { ApiPropertyOptional } from '@nestjs/swagger';

import { Currency } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class BaseEventDto {
  @ApiPropertyOptional({ example: 'Event title' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  declare title?: string;

  @ApiPropertyOptional({ example: '2024-01-01T10:00:00.000Z' })
  @Type(() => Date)
  @IsDate()
  declare eventDate: Date;

  @ApiPropertyOptional({ example: 150000, description: 'Vehicle mileage at event time (km)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare mileage?: number;

  @ApiPropertyOptional({ example: 250.5, description: 'Total cost of the event' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  declare cost?: number;

  @ApiPropertyOptional({ enum: Currency, example: Currency.PLN })
  @IsOptional()
  @IsEnum(Currency)
  declare currency?: Currency;

  @ApiPropertyOptional({ example: 'Additional notes about the event' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  declare description?: string;
}
