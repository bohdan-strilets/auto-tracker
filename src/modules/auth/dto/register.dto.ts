import { Locale } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { IsTimezone } from '@common/validators';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  declare email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  declare password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  declare firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  declare lastName: string;

  @IsEnum(Locale)
  declare locale: Locale;

  @IsTimezone()
  declare timezone: string;
}
