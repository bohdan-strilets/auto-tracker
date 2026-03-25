import { DeviceType } from '@prisma/client';

export type CreateSessionInput = {
  userId: string;
  refreshTokenHash: string;
  deviceType: DeviceType;
  deviceName?: string;
  deviceOS?: string;
  deviceBrowser?: string;
  ipAddress: string;
  userAgent: string;
  country?: string;
  city?: string;
  expiresAt: Date;
};
