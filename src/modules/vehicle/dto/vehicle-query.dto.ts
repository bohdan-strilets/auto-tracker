import { ApiPropertyOptional } from '@nestjs/swagger';

import { DriveType, FuelType, Transmission } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

import { SortOrder, VehicleSortField } from '../enums';

export class VehicleQueryDto {
  // ─── Pagination ───────────────────────────────────────────────────────────

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  declare page?: number;

  @ApiPropertyOptional({ example: 20, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  declare limit?: number;

  // ─── Sorting ──────────────────────────────────────────────────────────────

  @ApiPropertyOptional({ enum: VehicleSortField, default: VehicleSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(VehicleSortField)
  declare sortBy?: VehicleSortField;

  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  declare sortOrder?: SortOrder;

  // ─── Filters ──────────────────────────────────────────────────────────────

  @ApiPropertyOptional({ example: 'Toyota' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  declare brand?: string;

  @ApiPropertyOptional({ example: 'Camry' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  declare model?: string;

  @ApiPropertyOptional({ example: 2020 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1886)
  declare year?: number;

  @ApiPropertyOptional({ enum: FuelType, isArray: true, example: [FuelType.PETROL] })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsEnum(FuelType, { each: true })
  declare fuelType?: FuelType[];

  @ApiPropertyOptional({ enum: Transmission })
  @IsOptional()
  @IsEnum(Transmission)
  declare transmission?: Transmission;

  @ApiPropertyOptional({ enum: DriveType })
  @IsOptional()
  @IsEnum(DriveType)
  declare driveType?: DriveType;

  @ApiPropertyOptional({ example: 'White' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  declare color?: string;
}
