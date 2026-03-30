import { Vehicle } from '@prisma/client';

export type VehicleListItem = Pick<
  Vehicle,
  | 'id'
  | 'brand'
  | 'model'
  | 'year'
  | 'generation'
  | 'plateNumber'
  | 'fuelType'
  | 'transmission'
  | 'driveType'
  | 'color'
  | 'currentMileage'
  | 'deletedAt'
  | 'createdAt'
  | 'updatedAt'
>;
