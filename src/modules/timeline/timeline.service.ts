import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { MileageSource, TimelineEvent } from '@prisma/client';

import { VehicleService } from '@modules/vehicle/vehicle.service';

import { TimelineEventNotFoundException } from '@common/exceptions';
import { paginate } from '@common/pagination';

import { TimelineQueryDto } from './dto/timeline-query.dto';
import { MileageLogService } from './events/mileage-log';
import { TimelineRepository } from './timeline.repository';
import { CreateDetailsFn, CreateTimelineEventInput, TimelineEventWithDetails } from './types';

@Injectable()
export class TimelineService {
  constructor(
    private readonly repository: TimelineRepository,
    private readonly vehicleService: VehicleService,
    private readonly prisma: PrismaService,
    private readonly mileageLogService: MileageLogService,
  ) {}

  // ─── Centralized event creation ───────────────────────────────────────────

  async createEvent(
    vehicleId: string,
    workspaceId: string,
    eventData: CreateTimelineEventInput,
    createDetails: CreateDetailsFn,
  ): Promise<TimelineEvent> {
    await this.vehicleService.getOne(vehicleId, workspaceId);

    return this.prisma.$transaction(async (tx) => {
      const { mileageSource, ...eventFields } = eventData;
      const input = { ...eventFields, vehicle: { connect: { id: vehicleId } } };
      const event = await this.repository.create(input, tx);

      await createDetails(event.id, tx);

      if (eventData.mileage) {
        await this.mileageLogService.recordMileage(
          vehicleId,
          eventData.mileage,
          mileageSource ?? MileageSource.MANUAL,
          event.id,
          tx,
        );
      }
      return event;
    });
  }

  // ─── Queries ──────────────────────────────────────────────────────────────

  async findAll(vehicleId: string, workspaceId: string, query: TimelineQueryDto) {
    await this.vehicleService.getOne(vehicleId, workspaceId);

    const result = await this.repository.findAllByVehicleId(vehicleId, query);
    const { data, total } = result;

    return paginate(data, total, query.page, query.limit);
  }

  async getOne(
    eventId: string,
    vehicleId: string,
    workspaceId: string,
  ): Promise<TimelineEventWithDetails> {
    await this.vehicleService.getOne(vehicleId, workspaceId);

    const event = await this.repository.findById(eventId);
    if (!event || event.vehicleId !== vehicleId) throw new TimelineEventNotFoundException();

    return event;
  }

  async existsForUser(eventId: string, userId: string): Promise<boolean> {
    return this.repository.existsForUser(eventId, userId);
  }

  async delete(eventId: string, vehicleId: string, workspaceId: string): Promise<void> {
    await this.getOne(eventId, vehicleId, workspaceId);
    await this.repository.softDelete(eventId);
  }
}
