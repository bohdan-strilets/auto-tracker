import { DeviceType, SessionStatus } from '@prisma/client';

export class SessionResponseDto {
  declare id: string;
  declare deviceType: DeviceType;
  declare deviceName: string | null;
  declare deviceOS: string | null;
  declare deviceBrowser: string | null;
  declare ipAddress: string;
  declare country: string | null;
  declare city: string | null;
  declare lastActivityAt: Date;
  declare expiresAt: Date;
  declare status: SessionStatus;
  declare createdAt: Date;
  declare isCurrent: boolean;
}
