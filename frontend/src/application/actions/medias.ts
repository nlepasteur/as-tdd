export const updatePickedMedias = (payload: string) =>
  ({
    type: 'UPDATE_PICKED_MEDIAS',
    payload,
  } as const);

export const clearPickedMedias = () =>
  ({
    type: 'CLEAR_PICKED_MEDIAS',
  } as const);

export type MediasActions =
  | ReturnType<typeof updatePickedMedias>
  | ReturnType<typeof clearPickedMedias>;
