import { UserResponseDto } from '@modules/user/dto';

export type RegisterOutput = {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
};
