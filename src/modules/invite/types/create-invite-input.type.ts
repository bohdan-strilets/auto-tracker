import { WorkspaceRole } from '@prisma/client';

export type CreateInviteInput = {
  workspaceId: string;
  invitedById: string;
  email: string;
  role: WorkspaceRole;
  expiresAt: Date;
};
