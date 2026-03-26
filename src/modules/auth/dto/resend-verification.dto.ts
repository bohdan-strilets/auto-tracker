import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendVerificationDto {
  @ApiProperty({ example: 'rafal@example.com' })
  @IsEmail()
  @IsNotEmpty()
  declare email: string;
}
