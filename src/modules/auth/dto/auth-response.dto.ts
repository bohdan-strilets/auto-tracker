import { UserResponseDto } from '@modules/user/dto';

export class AuthResponseDto {
  declare user: UserResponseDto;
  declare accessToken: string;
}
