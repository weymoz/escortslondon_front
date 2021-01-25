import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "@typedefs/app";
import { filterApiCallBegan } from "./api";
import { RootState } from "./reducer";

export interface ServicesMenuStateSlice {
  list: MenuItem[];
}

const servicesMenu = createSlice({
  name: "servicesMenu",
  initialState: {
    list: [],
  } as ServicesMenuStateSlice,
  reducers: {
    servicesMenuRequested: () => {},
    servicesMenuError: () => {},
    servicesMenuReceived: (state, action: PayloadAction<MenuItem[]>) => {
      state.list = action.payload;
    },
  },
});

export default servicesMenu.reducer;

export const addServicesMenuData = () =>
  filterApiCallBegan({
    method: "get",
    url: "all-filterable-services",
    onSuccess: servicesMenu.actions.servicesMenuReceived.type,
    onStart: servicesMenu.actions.servicesMenuRequested.type,
    onError: servicesMenu.actions.servicesMenuError.type,
  });

export const selectServicesMenuData = (state: RootState) =>
  state.servicesMenu.list;
