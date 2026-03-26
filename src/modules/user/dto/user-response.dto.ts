import { RegistrationSource, UserStatus } from '@prisma/client';

export class UserResponseDto {
  declare id: string;
  declare email: string;
  declare firstName: string;
  declare lastName: string;
  declare status: UserStatus;
  declare emailVerified: boolean;
  declare emailVerifiedAt: Date | null;
  declare registrationSource: RegistrationSource;
  declare locale: string;
  declare timezone: string;
  declare lastLoginAt: Date;
  declare createdAt: Date;
}
