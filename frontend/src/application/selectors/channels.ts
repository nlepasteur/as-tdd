import type { RootState } from "../store";

export const getChannels = (state: RootState) => state.channels.data;
