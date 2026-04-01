import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ExpenseCategory } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { BaseEventDto } from '@modules/timeline/dto';

export class CreateExpenseDto extends BaseEventDto {
  @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.CARE })
  @IsEnum(ExpenseCategory)
  declare category: ExpenseCategory;

  @ApiPropertyOptional({ example: 'Car wash + interior cleaning' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  declare notes?: string;
}
