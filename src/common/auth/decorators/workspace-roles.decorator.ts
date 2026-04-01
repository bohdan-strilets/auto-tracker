import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { WorkspaceRole } from '@prisma/client';

import { WorkspaceMemberGuard, WorkspaceRolesGuard } from '@modules/workspace/guards';

export const WORKSPACE_ROLES_KEY = 'workspaceRoles';

export const WorkspaceRoles = (...roles: WorkspaceRole[]) =>
  SetMetadata(WORKSPACE_ROLES_KEY, roles);

export const IsMember = () => UseGuards(WorkspaceMemberGuard);

export const IsAdmin = () =>
  applyDecorators(
    UseGuards(WorkspaceMemberGuard, WorkspaceRolesGuard),
    WorkspaceRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN),
  );

export const IsOwner = () =>
  applyDecorators(
    UseGuards(WorkspaceMemberGuard, WorkspaceRolesGuard),
    WorkspaceRoles(WorkspaceRole.OWNER),
  );
