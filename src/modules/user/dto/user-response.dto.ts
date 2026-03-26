import { ApiProperty } from '@nestjs/swagger';

import { RegistrationSource, UserStatus } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid' })
  declare id: string;

  @ApiProperty({ example: 'rafal@example.com' })
  declare email: string;

  @ApiProperty({ example: 'Rafal', maxLength: 50 })
  declare firstName: string;

  @ApiProperty({ example: 'Polski', maxLength: 50 })
  declare lastName: string;

  @ApiProperty({ enum: UserStatus, example: UserStatus.ACTIVE })
  declare status: UserStatus;

  @ApiProperty({ example: false })
  declare emailVerified: boolean;

  @ApiProperty({ example: null, nullable: true })
  declare emailVerifiedAt: Date | null;

  @ApiProperty({ enum: RegistrationSource, example: RegistrationSource.EMAIL })
  declare registrationSource: RegistrationSource;

  @ApiProperty({ example: 'PL_PL' })
  declare locale: string;

  @ApiProperty({ example: 'Europe/Warsaw' })
  declare timezone: string;

  @ApiProperty({ example: '2026-03-26T00:00:00.000Z' })
  declare lastLoginAt: Date;

  @ApiProperty({ example: '2026-03-26T00:00:00.000Z' })
  declare createdAt: Date;
}
