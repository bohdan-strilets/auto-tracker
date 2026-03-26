import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailDto {
  @ApiProperty({ example: 'new@example.com' })
  @IsEmail()
  @IsNotEmpty()
  declare newEmail: string;

  @ApiProperty({ example: 'Test1234' })
  @IsString()
  @IsNotEmpty()
  declare password: string;
}
