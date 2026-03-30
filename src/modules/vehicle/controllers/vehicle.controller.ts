import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IsAdmin, IsMember } from '@modules/workspace/decorators';

import {
  ApiCreateVehicleResponse,
  ApiDeleteVehicleResponse,
  ApiGetVehicleResponse,
  ApiGetVehiclesResponse,
  ApiUpdateVehicleResponse,
} from '@common/swagger';

import { CreateVehicleDto, UpdateVehicleDto } from '../dto';
import { VehicleService } from '../vehicle.service';

@ApiTags('Vehicles')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @IsAdmin()
  @ApiOperation({ summary: 'Create vehicle (Admin/Owner only)' })
  @ApiCreateVehicleResponse()
  create(@Param('workspaceId', ParseUUIDPipe) workspaceId: string, @Body() dto: CreateVehicleDto) {
    return this.vehicleService.create(workspaceId, dto);
  }

  @Get()
  @IsMember()
  @ApiOperation({ summary: 'List workspace vehicles' })
  @ApiGetVehiclesResponse()
  findAll(@Param('workspaceId', ParseUUIDPipe) workspaceId: string) {
    return this.vehicleService.findAll(workspaceId);
  }

  @Get(':vehicleId')
  @IsMember()
  @ApiOperation({ summary: 'Get vehicle by ID' })
  @ApiGetVehicleResponse()
  findOne(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
  ) {
    return this.vehicleService.getOne(vehicleId, workspaceId);
  }

  @Patch(':vehicleId')
  @IsAdmin()
  @ApiOperation({ summary: 'Update vehicle (Admin/Owner only)' })
  @ApiUpdateVehicleResponse()
  update(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(vehicleId, workspaceId, dto);
  }

  @Delete(':vehicleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsAdmin()
  @ApiOperation({ summary: 'Delete vehicle (Admin/Owner only)' })
  @ApiNoContentResponse({ description: 'Vehicle deleted' })
  @ApiDeleteVehicleResponse()
  async delete(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
  ) {
    await this.vehicleService.delete(vehicleId, workspaceId);
  }
}
