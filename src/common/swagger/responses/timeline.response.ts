import { applyDecorators } from '@nestjs/common';

import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from './base.responses';

export const ApiGetTimelineResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('NOT_WORKSPACE_MEMBER'),
    ApiNotFoundResponse('VEHICLE_NOT_FOUND'),
  );

export const ApiGetTimelineEventResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('NOT_WORKSPACE_MEMBER'),
    ApiNotFoundResponse('TIMELINE_EVENT_NOT_FOUND'),
  );

export const ApiDeleteTimelineEventResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('TIMELINE_EVENT_NOT_FOUND'),
  );

export const ApiCreateTimelineEventResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('VEHICLE_NOT_FOUND'),
  );
