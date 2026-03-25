import { Session } from '@prisma/client';

export type SessionResponse = {
  session: Session;
  accessToken: string;
  refreshToken: string;
};
