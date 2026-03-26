import { ApiProperty } from '@nestjs/swagger';

import { UserResponseDto } from '@modules/user/dto';

export class AuthResponseDto {
  @ApiProperty({ type: UserResponseDto })
  declare user: UserResponseDto;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  declare accessToken: string;
}
