import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DriveType, FuelType, Transmission } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const CURRENT_YEAR = new Date().getFullYear();

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  declare brand: string;

  @ApiProperty({ example: 'Camry' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  declare model: string;

  @ApiProperty({ example: 2020 })
  @IsInt()
  @Min(1886)
  @Max(CURRENT_YEAR + 1)
  declare year: number;

  @ApiPropertyOptional({ example: 'XV70' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  declare generation?: string;

  @ApiPropertyOptional({ example: '1HGBH41JXMN109186' })
  @IsOptional()
  @IsString()
  @MaxLength(17)
  declare vin?: string;

  @ApiPropertyOptional({ example: 'ABC-1234' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  declare plateNumber?: string;

  @ApiPropertyOptional({ example: '2AR-FE' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  declare engineName?: string;

  @ApiProperty({ enum: FuelType, isArray: true, example: [FuelType.PETROL] })
  @IsArray()
  @IsEnum(FuelType, { each: true })
  declare fuelType: FuelType[];

  @ApiProperty({ enum: Transmission, example: Transmission.AUTOMATIC })
  @IsEnum(Transmission)
  declare transmission: Transmission;

  @ApiProperty({ enum: DriveType, example: DriveType.FWD })
  @IsEnum(DriveType)
  declare driveType: DriveType;

  @ApiPropertyOptional({ example: 'Pearl White' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  declare color?: string;

  @ApiPropertyOptional({ example: 50000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare currentMileage?: number;

  @ApiPropertyOptional({ example: 'Great family car' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  declare description?: string;
}
