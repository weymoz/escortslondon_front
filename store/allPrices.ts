import { apiCallBegan, filterApiCallBegan } from './api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './reducer';

type AllPricesSliceState = {
  list: string[];
};

const allPrices = createSlice({
  name: 'allPrices',
  initialState: {
    list: [],
  } as AllPricesSliceState,
  reducers: {
    allPricesRequested: () => {},
    allPricesRequestError: () => {},
    allPricesReceived: (allPrices, action: PayloadAction<string[]>) => {
      allPrices.list = action.payload;
    },
  },
});

export default allPrices.reducer;

export const addAllPrices = () =>
  filterApiCallBegan({
    url: '/all-prices',
    method: 'get',
    onStart: allPrices.actions.allPricesRequested.type,
    onError: allPrices.actions.allPricesRequestError.type,
    onSuccess: allPrices.actions.allPricesReceived.type,
  });

export const addAllDuoPrices = () =>
  filterApiCallBegan({
    url: '/duo-all-prices',
    method: 'get',
    onStart: allPrices.actions.allPricesRequested.type,
    onError: allPrices.actions.allPricesRequestError.type,
    onSuccess: allPrices.actions.allPricesReceived.type,
  });

export const selectAllPrices = (state: RootState): string[] =>
  state.allPrices.list;
