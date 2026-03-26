import { ApiProperty } from '@nestjs/swagger';

import { DeviceType, SessionStatus } from '@prisma/client';

export class SessionResponseDto {
  @ApiProperty({ example: 'uuid' })
  declare id: string;

  @ApiProperty({ enum: DeviceType, example: DeviceType.DESKTOP })
  declare deviceType: DeviceType;

  @ApiProperty({ example: 'iPhone', nullable: true })
  declare deviceName: string | null;

  @ApiProperty({ example: 'iOS', nullable: true })
  declare deviceOS: string | null;

  @ApiProperty({ example: 'Safari', nullable: true })
  declare deviceBrowser: string | null;

  @ApiProperty({ example: '127.0.0.1' })
  declare ipAddress: string;

  @ApiProperty({ example: 'PL', nullable: true })
  declare country: string | null;

  @ApiProperty({ example: 'Warsaw', nullable: true })
  declare city: string | null;

  @ApiProperty({ example: '2026-03-26T00:00:00.000Z' })
  declare lastActivityAt: Date;

  @ApiProperty({ example: '2026-04-26T00:00:00.000Z' })
  declare expiresAt: Date;

  @ApiProperty({ enum: SessionStatus, example: SessionStatus.ACTIVE })
  declare status: SessionStatus;

  @ApiProperty({ example: '2026-03-26T00:00:00.000Z' })
  declare createdAt: Date;

  @ApiProperty({ example: true })
  declare isCurrent: boolean;
}
