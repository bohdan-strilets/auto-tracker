import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { WorkspaceRole } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';

export class CreateInviteDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  declare email: string;

  @ApiPropertyOptional({ enum: WorkspaceRole, default: WorkspaceRole.MEMBER })
  @IsOptional()
  @IsEnum(WorkspaceRole)
  declare role?: WorkspaceRole;
}
