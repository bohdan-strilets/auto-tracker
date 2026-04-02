import { Injectable } from '@nestjs/common';

import { MileageSource, TimelineEvent, TimelineEventType } from '@prisma/client';

import { TimelineService } from '@modules/timeline/timeline.service';

import { CreateServiceLogDto } from './dto';

@Injectable()
export class ServiceLogService {
  constructor(private readonly timelineService: TimelineService) {}

  async create(
    vehicleId: string,
    workspaceId: string,
    dto: CreateServiceLogDto,
  ): Promise<TimelineEvent> {
    return this.timelineService.createEvent(
      vehicleId,
      workspaceId,
      {
        type: TimelineEventType.SERVICE,
        title: dto.title ?? `${dto.category} — ${dto.description}`,
        eventDate: dto.eventDate,
        mileage: dto.mileage,
        mileageSource: MileageSource.SERVICE,
        cost: dto.cost,
        currency: dto.currency,
        description: dto.description,
      },
      async (eventId, tx) => {
        await tx.serviceLog.create({
          data: {
            eventId,
            category: dto.category,
            description: dto.description,
          },
        });
      },
    );
  }
}
