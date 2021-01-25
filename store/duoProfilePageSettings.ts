import { DuoProfilePageSettingsModel } from "@models/DuoProfilePageSettingsModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DuoProfilePageSettings,
  DuoProfilePageSettingsResponse,
} from "@typedefs/app";
import { RootState } from "./reducer";

interface DuoProfilePageSettingsStateSlice {
  data: DuoProfilePageSettings | null;
}

const duoProfilePageSettings = createSlice({
  name: "duoProfilePageSettings",
  initialState: {
    data: null,
  } as DuoProfilePageSettingsStateSlice,
  reducers: {
    received: (
      state,
      action: PayloadAction<DuoProfilePageSettingsResponse>
    ) => {
      state.data = new DuoProfilePageSettingsModel(
        action.payload
      ).getSerializable();
    },
  },
});

export default duoProfilePageSettings.reducer;

export const duoProfilePageSettingsDataReceived =
  duoProfilePageSettings.actions.received;

export const selectDuoProfilePageSettings = (
  state: RootState
): DuoProfilePageSettings => state.duoProfilePageSettings.data;
