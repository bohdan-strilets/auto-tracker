import { Injectable } from '@nestjs/common';

import { Vehicle, VehicleSpecs } from '@prisma/client';

import { VehicleNotFoundException } from '@common/exceptions';

import { CreateVehicleDto, UpdateVehicleDto, UpdateVehicleSpecsDto } from './dto';
import { VehicleListItem, VehicleWithSpecs } from './types';
import { VehicleRepository } from './vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  // ─── CRUD ─────────────────────────────────────────────────────────────────

  async create(workspaceId: string, dto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleRepository.create(workspaceId, dto);
  }

  async findAll(workspaceId: string): Promise<VehicleListItem[]> {
    return this.vehicleRepository.findAllByWorkspaceId(workspaceId);
  }

  async getOne(vehicleId: string, workspaceId: string): Promise<VehicleWithSpecs> {
    const vehicle = await this.vehicleRepository.findByIdWithSpecs(vehicleId);

    if (!vehicle || vehicle.workspaceId !== workspaceId) {
      throw new VehicleNotFoundException();
    }

    return vehicle;
  }

  async update(vehicleId: string, workspaceId: string, dto: UpdateVehicleDto): Promise<Vehicle> {
    await this.getOne(vehicleId, workspaceId);
    return this.vehicleRepository.update(vehicleId, dto);
  }

  async delete(vehicleId: string, workspaceId: string): Promise<void> {
    await this.getOne(vehicleId, workspaceId);
    await this.vehicleRepository.softDelete(vehicleId);
  }

  // ─── Specs ────────────────────────────────────────────────────────────────

  async updateSpecs(
    vehicleId: string,
    workspaceId: string,
    dto: UpdateVehicleSpecsDto,
  ): Promise<VehicleSpecs> {
    await this.getOne(vehicleId, workspaceId);
    return this.vehicleRepository.upsertSpecs(vehicleId, dto);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  async findById(vehicleId: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) throw new VehicleNotFoundException();
    return vehicle;
  }
}
