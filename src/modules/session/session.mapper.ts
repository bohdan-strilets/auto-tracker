import { Session } from '@prisma/client';

import { SessionResponseDto } from './dto';

export const toSessionResponseDto = (
  session: Session,
  currentSessionId?: string,
): SessionResponseDto => {
  const dto = new SessionResponseDto();

  dto.id = session.id;
  dto.deviceType = session.deviceType;
  dto.deviceName = session.deviceName;
  dto.deviceOS = session.deviceOS;
  dto.deviceBrowser = session.deviceBrowser;
  dto.ipAddress = session.ipAddress;
  dto.country = session.country;
  dto.city = session.city;
  dto.lastActivityAt = session.lastActivityAt;
  dto.expiresAt = session.expiresAt;
  dto.status = session.status;
  dto.createdAt = session.createdAt;
  dto.isCurrent = session.id === currentSessionId;

  return dto;
};
