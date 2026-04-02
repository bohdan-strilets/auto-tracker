import { Injectable } from '@nestjs/common';

import { MileageSource, TimelineEvent, TimelineEventType } from '@prisma/client';

import { TimelineService } from '@modules/timeline/timeline.service';
import { VehicleService } from '@modules/vehicle/vehicle.service';

import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SaleService {
  constructor(
    private readonly timelineService: TimelineService,
    private readonly vehicleService: VehicleService,
  ) {}

  async create(vehicleId: string, workspaceId: string, dto: CreateSaleDto): Promise<TimelineEvent> {
    return this.timelineService.createEvent(
      vehicleId,
      workspaceId,
      {
        type: TimelineEventType.SALE,
        title: dto.title ?? 'Vehicle sale',
        eventDate: dto.eventDate,
        mileage: dto.mileage,
        mileageSource: MileageSource.MANUAL,
        cost: dto.cost,
        currency: dto.currency,
        description: dto.description,
      },
      async (eventId, tx) => {
        await this.vehicleService.updateSaleInfo(
          vehicleId,
          {
            saleDate: dto.eventDate,
            salePrice: dto.cost,
            saleMileage: dto.mileage,
          },
          tx,
        );
      },
    );
  }
}
