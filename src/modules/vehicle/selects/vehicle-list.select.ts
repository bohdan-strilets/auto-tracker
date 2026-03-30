import { Prisma } from '@prisma/client';

export const vehicleListSelect = {
  id: true,
  brand: true,
  model: true,
  year: true,
  generation: true,
  plateNumber: true,
  fuelType: true,
  transmission: true,
  driveType: true,
  color: true,
  currentMileage: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.VehicleSelect;
