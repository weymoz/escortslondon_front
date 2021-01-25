import CastingPageSettingsModel from "@models/CastingPageSettingsModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CastingPageSettings,
  CastingPageSettingsResponse,
} from "@typedefs/app";
import { RootState } from "./reducer";

interface CastingPageSettingsStateSlice {
  data: CastingPageSettings | null;
}

const castingPageSettings = createSlice({
  name: "castingPageSettings",
  initialState: {
    data: null,
  } as CastingPageSettingsStateSlice,
  reducers: {
    received: (state, action: PayloadAction<CastingPageSettingsResponse>) => {
      state.data = new CastingPageSettingsModel(
        action.payload
      ).getSerializable();
    },
  },
});

export default castingPageSettings.reducer;
export const castingPageSettingsDataReceived =
  castingPageSettings.actions.received;

export const selectCastingPageSettings = (
  state: RootState
): CastingPageSettings => state.castingPageSettings.data;
