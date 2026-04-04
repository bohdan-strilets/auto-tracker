import { Module } from '@nestjs/common';

import { SessionModule } from '@modules/session/session.module';
import { WorkspaceModule } from '@modules/workspace/workspace.module';

import { UserRepository, UserSettingsRepository } from './repositories';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [SessionModule, WorkspaceModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserSettingsRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
