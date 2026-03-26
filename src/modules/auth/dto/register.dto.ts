import { ApiProperty } from '@nestjs/swagger';

import { Locale } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { IsTimezone } from '@common/validators';

export class RegisterDto {
  @ApiProperty({ example: 'rafal@example.com' })
  @IsEmail()
  @IsNotEmpty()
  declare email: string;

  @ApiProperty({ example: 'Test1234', minLength: 8, maxLength: 64 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  declare password: string;

  @ApiProperty({ example: 'Rafal', maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  declare firstName: string;

  @ApiProperty({ example: 'Polski', maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  declare lastName: string;

  @ApiProperty({ example: 'PL_PL', enum: Locale })
  @IsEnum(Locale as object)
  declare locale: Locale;

  @ApiProperty({ example: 'Europe/Warsaw' })
  @IsTimezone()
  declare timezone: string;
}
