import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ExpenseCategory } from '@prisma/client';

export class ExpenseResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.CARE })
  declare category: ExpenseCategory;

  @ApiPropertyOptional({ example: 'Car wash + interior cleaning' })
  declare notes?: string;

  @ApiProperty({ example: '2024-01-01T10:00:00.000Z' })
  declare createdAt: Date;
}
