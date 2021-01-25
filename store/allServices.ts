import { apiCallBegan, filterApiCallBegan } from './api';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './reducer';
import { MenuItem } from '@typedefs/app';

type AllServicesSliceState = {
  list: string[];
};

const allServices = createSlice({
  name: 'allServices',
  initialState: {
    list: [],
  } as AllServicesSliceState,
  reducers: {
    allServicesRequested: () => {},
    allServicesRequestError: () => {},
    allServicesReceived: (allServices, action: PayloadAction<string[]>) => {
      allServices.list = action.payload;
    },
  },
});

export default allServices.reducer;

export const addAllServices = () =>
  filterApiCallBegan({
    url: '/all-services',
    method: 'get',
    onStart: allServices.actions.allServicesRequested.type,
    onError: allServices.actions.allServicesRequestError.type,
    onSuccess: allServices.actions.allServicesReceived.type,
  });

export const addAllDuoServices = () =>
  filterApiCallBegan({
    url: '/duo-all-services',
    method: 'get',
    onStart: allServices.actions.allServicesRequested.type,
    onError: allServices.actions.allServicesRequestError.type,
    onSuccess: allServices.actions.allServicesReceived.type,
  });

export const selectAllServices = (state: RootState): string[] =>
  state.allServices.list;

export const selectAllServicesAsMenuItems = createSelector<
  RootState,
  string[],
  MenuItem[]
>(
  state => state.allServices.list,
  list =>
    list.map(item => ({
      title: item,
      slug: item
        .toLowerCase()
        .replace(' - ', '-')
        .replace(' ', '-'),
    })),
);
