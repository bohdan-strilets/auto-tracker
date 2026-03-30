import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, Vehicle, VehicleSpecs } from '@prisma/client';

import { SortOrder } from '@common/pagination';

import { VehicleQueryDto } from './dto';
import { VehicleSortField } from './enums';
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
    query: VehicleQueryDto,
    tx?: Prisma.TransactionClient,
  ): Promise<{ data: VehicleListItem[]; total: number }> {
    const client = tx ?? this.prisma;

    const {
      page = 1,
      limit = 20,
      sortBy = VehicleSortField.CREATED_AT,
      sortOrder = SortOrder.DESC,
      brand,
      model,
      year,
      fuelType,
      transmission,
      driveType,
      color,
    } = query;

    const where: Prisma.VehicleWhereInput = {
      workspaceId,
      deletedAt: null,
      ...(brand && { brand: { contains: brand, mode: 'insensitive' } }),
      ...(model && { model: { contains: model, mode: 'insensitive' } }),
      ...(year && { year }),
      ...(fuelType?.length && { fuelType: { hasSome: fuelType } }),
      ...(transmission && { transmission }),
      ...(driveType && { driveType }),
      ...(color && { color: { contains: color, mode: 'insensitive' } }),
    };

    const [data, total] = await client.$transaction([
      client.vehicle.findMany({
        where,
        select: vehicleListSelect,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      client.vehicle.count({ where }),
    ]);

    return { data, total };
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
