export const incrementPagination = () =>
  ({
    type: 'INCREMENT_PAGINATION',
  } as const);

export const resetPagination = () =>
  ({
    type: 'RESET_PAGINATION',
  } as const);

export type PaginationAction =
  | ReturnType<typeof incrementPagination>
  | ReturnType<typeof resetPagination>;
