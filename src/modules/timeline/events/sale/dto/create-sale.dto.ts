import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

import { BaseEventDto } from '@modules/timeline/dto';

export class CreateSaleDto extends BaseEventDto {
  @ApiProperty({ example: 40000.0, description: 'Sale price' })
  @IsNumber()
  @Min(0)
  declare cost: number;

  @ApiProperty({ example: 98000, description: 'Mileage at sale time' })
  @IsInt()
  @Min(0)
  declare mileage: number;

  @ApiPropertyOptional({ example: 'Sold to private buyer' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  declare notes?: string;
}
