import MainPageSettingsModel from "@models/MainPageSettingsModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MainPageSettings, MainPageSettingsResponse } from "@typedefs/app";
import { RootState } from "./reducer";
const mainPageSettings = createSlice({
  name: "mainPageSettings",
  initialState: {
    data: null,
  } as { data: MainPageSettings | null },
  reducers: {
    received: (state, action: PayloadAction<MainPageSettingsResponse>) => {
      state.data = new MainPageSettingsModel(action.payload).getSerializable();
    },
  },
});

export default mainPageSettings.reducer;
export const mainPageSettingsReceived = mainPageSettings.actions.received;

export const selectMainPageSettings = (state: RootState): MainPageSettings =>
  state.mainPageSettings.data;
