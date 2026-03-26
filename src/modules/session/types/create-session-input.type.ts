import { DeviceType } from '@prisma/client';

export type CreateSessionInput = {
  id: string;
  userId: string;
  refreshTokenHash: string;
  deviceType: DeviceType;
  deviceName?: string | null;
  deviceOS?: string | null;
  deviceBrowser?: string | null;
  ipAddress: string;
  userAgent: string;
  country?: string | null;
  city?: string | null;
  expiresAt: Date;
};

export type CreateSessionInputWithoutSensitiveData = Omit<
  CreateSessionInput,
  'refreshTokenHash' | 'expiresAt'
>;
