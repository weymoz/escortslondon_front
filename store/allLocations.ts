import { apiCallBegan, filterApiCallBegan } from './api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './reducer';

type AllLocationsSliceState = {
  list: string[];
};

const allLocations = createSlice({
  name: 'allLocations',
  initialState: {
    list: [],
  } as AllLocationsSliceState,
  reducers: {
    locationsRequested: () => {},
    locationsRequestError: () => {},
    locationsReceived: (allLocations, action: PayloadAction<string[]>) => {
      allLocations.list = action.payload.filter(
        location => location.trim() !== '',
      );
    },
  },
});

export default allLocations.reducer;

export const addAllLocations = () =>
  filterApiCallBegan({
    url: '/all-locations',
    method: 'get',
    onStart: allLocations.actions.locationsRequested.type,
    onError: allLocations.actions.locationsRequestError.type,
    onSuccess: allLocations.actions.locationsReceived.type,
  });

export const addAllDuoLocations = () =>
  filterApiCallBegan({
    url: '/duo-all-locations',
    method: 'get',
    onStart: allLocations.actions.locationsRequested.type,
    onError: allLocations.actions.locationsRequestError.type,
    onSuccess: allLocations.actions.locationsReceived.type,
  });

export const selectAllLocations = (state: RootState): string[] =>
  state.allLocations.list;
