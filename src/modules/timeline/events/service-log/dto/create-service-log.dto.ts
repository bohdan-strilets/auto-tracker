import { ApiProperty } from '@nestjs/swagger';

import { ServiceCategory } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { BaseEventDto } from '@modules/timeline/dto';

export class CreateServiceLogDto extends BaseEventDto {
  @ApiProperty({ enum: ServiceCategory, example: ServiceCategory.MAINTENANCE })
  @IsEnum(ServiceCategory)
  declare category: ServiceCategory;

  @ApiProperty({ example: 'Oil and filter change' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  declare description: string;
}
