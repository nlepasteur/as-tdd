const isLogged = () =>
  ({
    type: 'IS_LOGGED',
  } as const);

export type IsLoggedActions = ReturnType<typeof isLogged>;
