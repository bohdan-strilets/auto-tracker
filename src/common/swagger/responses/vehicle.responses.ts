import { applyDecorators } from '@nestjs/common';

import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from './base.responses';

export const ApiCreateVehicleResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
  );

export const ApiGetVehiclesResponse = () =>
  applyDecorators(ApiUnauthorizedResponse(), ApiForbiddenResponse('NOT_WORKSPACE_MEMBER'));

export const ApiGetVehicleResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('NOT_WORKSPACE_MEMBER'),
    ApiNotFoundResponse('VEHICLE_NOT_FOUND'),
  );

export const ApiUpdateVehicleResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('VEHICLE_NOT_FOUND'),
  );

export const ApiDeleteVehicleResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('VEHICLE_NOT_FOUND'),
  );

export const ApiUpdateVehicleSpecsResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('VEHICLE_NOT_FOUND'),
  );
