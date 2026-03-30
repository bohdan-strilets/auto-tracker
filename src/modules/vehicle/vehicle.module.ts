import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { WorkspaceModule } from '@modules/workspace/workspace.module';

import { VehicleController, VehicleSpecsController } from './controllers';
import { VehicleRepository } from './vehicle.repository';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [PrismaModule, WorkspaceModule],
  controllers: [VehicleController, VehicleSpecsController],
  providers: [VehicleService, VehicleRepository],
  exports: [VehicleService],
})
export class VehicleModule {}
