import { createSlice } from '@reduxjs/toolkit';

interface FiltersStateSlice {
  show: boolean;
}

const filters = createSlice({
  name: 'filters',
  initialState: {
    show: false,
  } as FiltersStateSlice,
  reducers: {
    toggleDisplay: filters => {
      filters.show = !filters.show;
    },
  },
});

export default filters.reducer;

export const toggleFiltersDisplay = filters.actions.toggleDisplay;
