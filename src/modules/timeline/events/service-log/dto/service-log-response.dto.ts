import { ApiProperty } from '@nestjs/swagger';

import { ServiceCategory } from '@prisma/client';

export class ServiceLogResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare eventId: string;

  @ApiProperty({ enum: ServiceCategory, example: ServiceCategory.MAINTENANCE })
  declare category: ServiceCategory;

  @ApiProperty({ example: 'Oil and filter change' })
  declare description: string;

  @ApiProperty({ example: '2024-01-01T10:00:00.000Z' })
  declare createdAt: Date;
}
