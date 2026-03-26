import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'Test1234' })
  @IsString()
  @IsNotEmpty()
  declare currentPassword: string;

  @ApiProperty({ example: 'NewTest1234', minLength: 8, maxLength: 64 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  declare newPassword: string;
}
