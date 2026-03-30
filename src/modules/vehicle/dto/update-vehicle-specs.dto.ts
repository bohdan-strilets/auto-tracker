import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateVehicleSpecsDto {
  @ApiPropertyOptional({ example: '2AR-FE' })
  @IsOptional()
  declare engineCode?: string;

  @ApiPropertyOptional({ example: 181 })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare enginePowerHp?: number;

  @ApiPropertyOptional({ example: 133 })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare enginePowerKw?: number;

  @ApiPropertyOptional({ example: 235 })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare torqueNm?: number;

  @ApiPropertyOptional({ example: 60.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  declare fuelTankCapacity?: number;

  @ApiPropertyOptional({ example: 10.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  declare cityConsumption?: number;

  @ApiPropertyOptional({ example: 7.2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  declare highwayConsumption?: number;

  @ApiPropertyOptional({ example: 8.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  declare combinedConsumption?: number;

  @ApiPropertyOptional({ example: 4885 })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare lengthMm?: number;

  @ApiPropertyOptional({ example: 1840 })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare widthMm?: number;

  @ApiPropertyOptional({ example: 1455 })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare heightMm?: number;

  @ApiPropertyOptional({ example: 1560 })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare weightKg?: number;
}
