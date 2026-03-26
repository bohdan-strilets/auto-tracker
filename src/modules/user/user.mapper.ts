import { User } from '@prisma/client';

import { UserResponseDto } from './dto/user-response.dto';

export const toUserResponseDto = (user: User): UserResponseDto => {
  const dto = new UserResponseDto();
  dto.id = user.id;
  dto.email = user.email;
  dto.firstName = user.firstName;
  dto.lastName = user.lastName;
  dto.status = user.status;
  dto.emailVerified = user.emailVerified ?? false;
  dto.emailVerifiedAt = user.emailVerifiedAt;
  dto.registrationSource = user.registrationSource;
  dto.locale = user.locale;
  dto.timezone = user.timezone;
  dto.lastLoginAt = user.lastLoginAt;
  dto.createdAt = user.createdAt;
  return dto;
};
