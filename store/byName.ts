import { filterApiCallBegan } from './api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Escort } from './escorts';
import { EscortIndexed } from './types';

interface SliceState {
  list: EscortIndexed[];
  loading: boolean;
}

const byName = createSlice({
  name: 'byName',
  initialState: {
    list: [],
    loading: false,
  } as SliceState,
  reducers: {
    escortsRequested: escorts => {
      escorts.loading = true;
    },
    escortsError: escorts => {
      escorts.loading = false;
    },
    escortsReceived: (escorts, action: PayloadAction<EscortIndexed[]>) => {
      escorts.list = action.payload;
      escorts.loading = false;
    },
    clean: escorts => {
      escorts.list = [];
    },
  },
});

export default byName.reducer;
export const cleanFilteredByName = byName.actions.clean;

export const filterByName = (
  title: string,
): ReturnType<typeof filterApiCallBegan> =>
  filterApiCallBegan({
    url: '/filter',
    method: 'get',
    params: {
      title,
    },
    onSuccess: byName.actions.escortsReceived.type,
    onStart: byName.actions.escortsRequested.type,
    onError: byName.actions.escortsError.type,
  });

export const addAllEscorts = (): ReturnType<typeof filterApiCallBegan> =>
  filterApiCallBegan({
    url: '/all-escorts',
    method: 'get',
    params: {
      ['field[]']: 'title',
    },
    onSuccess: byName.actions.escortsReceived.type,
    onStart: byName.actions.escortsRequested.type,
    onError: byName.actions.escortsError.type,
  });
