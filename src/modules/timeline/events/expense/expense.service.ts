import { Injectable } from '@nestjs/common';

import { TimelineEvent, TimelineEventType } from '@prisma/client';

import { TimelineService } from '@modules/timeline/timeline.service';

import { CreateExpenseDto } from './dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly timelineService: TimelineService) {}

  async create(vehicleId: string, dto: CreateExpenseDto): Promise<TimelineEvent> {
    return this.timelineService.createEvent(
      vehicleId,
      {
        type: TimelineEventType.EXPENSE,
        title: dto.title ?? dto.category,
        eventDate: dto.eventDate,
        mileage: dto.mileage,
        cost: dto.cost,
        currency: dto.currency,
        description: dto.description,
      },
      async (eventId, tx) => {
        await tx.expense.create({
          data: {
            eventId,
            category: dto.category,
            notes: dto.notes,
          },
        });
      },
    );
  }
}
