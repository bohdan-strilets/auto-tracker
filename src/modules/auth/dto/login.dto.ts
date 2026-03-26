import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'rafal@example.com' })
  @IsEmail()
  @IsNotEmpty()
  declare email: string;

  @ApiProperty({ example: 'Test1234' })
  @IsString()
  @IsNotEmpty()
  declare password: string;
}
