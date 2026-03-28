import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

import { AuthenticatedUser } from '../types';

export const CurrentSessionId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as AuthenticatedUser;
    return user.sessionId;
  },
);
