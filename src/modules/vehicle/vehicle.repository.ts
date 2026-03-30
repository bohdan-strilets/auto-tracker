import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, Vehicle, VehicleSpecs } from '@prisma/client';

import { vehicleListSelect } from './selects';
import { VehicleListItem, VehicleWithSpecs } from './types';

@Injectable()
export class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    workspaceId: string,
    data: Prisma.VehicleCreateWithoutWorkspaceInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Vehicle> {
    const client = tx ?? this.prisma;
    return client.vehicle.create({
      data: { ...data, workspaceId },
    });
  }

  async findById(id: string, tx?: Prisma.TransactionClient): Promise<Vehicle | null> {
    const client = tx ?? this.prisma;
    return client.vehicle.findUnique({ where: { id, deletedAt: null } });
  }

  async findByIdWithSpecs(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<VehicleWithSpecs | null> {
    const client = tx ?? this.prisma;
    return client.vehicle.findUnique({
      where: { id, deletedAt: null },
      include: { specs: true },
    });
  }

  async findAllByWorkspaceId(
    workspaceId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<VehicleListItem[]> {
    const client = tx ?? this.prisma;
    return client.vehicle.findMany({
      where: { workspaceId, deletedAt: null },
      select: vehicleListSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    id: string,
    data: Prisma.VehicleUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Vehicle> {
    const client = tx ?? this.prisma;
    return client.vehicle.update({ where: { id }, data });
  }

  async softDelete(id: string, tx?: Prisma.TransactionClient): Promise<Vehicle> {
    const client = tx ?? this.prisma;
    const now = new Date();

    return client.vehicle.update({
      where: { id },
      data: { deletedAt: now },
    });
  }

  // ─── Specs ────────────────────────────────────────────────────────────────

  async upsertSpecs(
    vehicleId: string,
    data: Prisma.VehicleSpecsUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<VehicleSpecs> {
    const client = tx ?? this.prisma;
    return client.vehicleSpecs.upsert({
      where: { vehicleId },
      update: data,
      create: { vehicleId, ...data } as Prisma.VehicleSpecsCreateInput,
    });
  }
}
