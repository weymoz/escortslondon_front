import EscortsDuoPageSettingsModel from "@models/EscortsDuoPageSettingsModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EscortsDuoPageSettings,
  EscortsDuoPageSettingsResponse,
} from "@typedefs/app";
import { RootState } from "./reducer";

interface EscortsDuoPageSettingsStateSlice {
  data: EscortsDuoPageSettings | null;
}

const escortsDuoPageSettings = createSlice({
  name: "escortsDuoPageSettings",
  initialState: {
    data: null,
  } as EscortsDuoPageSettingsStateSlice,
  reducers: {
    received: (
      state,
      action: PayloadAction<EscortsDuoPageSettingsResponse>
    ) => {
      state.data = new EscortsDuoPageSettingsModel(
        action.payload
      ).getSerializable();
    },
  },
});

export default escortsDuoPageSettings.reducer;
export const escortsDuoPageSettingsDataReceived =
  escortsDuoPageSettings.actions.received;

export const selectEscortsDuoPageSettings = (
  state: RootState
): EscortsDuoPageSettings => state.escortsDuoPageSettings.data;
