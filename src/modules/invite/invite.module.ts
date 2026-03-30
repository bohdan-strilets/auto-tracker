import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { UserModule } from '@modules/user/user.module';
import { WorkspaceModule } from '@modules/workspace/workspace.module';

import { MailModule } from '@common/mail/mail.module';

import { InviteController } from './invite.controller';
import { InviteRepository } from './invite.repository';
import { InviteService } from './invite.service';

@Module({
  imports: [PrismaModule, MailModule, WorkspaceModule, UserModule],
  controllers: [InviteController],
  providers: [InviteService, InviteRepository],
})
export class InviteModule {}
