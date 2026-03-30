import { Vehicle, VehicleSpecs } from '@prisma/client';

export type VehicleWithSpecs = Vehicle & {
  specs: VehicleSpecs | null;
};
