import { PaginatedResult } from './types';

export const paginate = <T>(
  data: T[],
  total: number,
  page: number = 1,
  limit: number = 20,
): PaginatedResult<T> => {
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
