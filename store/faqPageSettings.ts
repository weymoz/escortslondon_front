import FaqPageSettingsModel from "@models/FaqPageSettingsModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FaqPageSettings, FaqPageSettingsResponse } from "@typedefs/app";
import { RootState } from "./reducer";

interface FaqPageSettingsStateSlice {
  data: FaqPageSettings | null;
}

const faqPageSettings = createSlice({
  name: "faqPageSettings",
  initialState: {
    data: null,
  } as FaqPageSettingsStateSlice,
  reducers: {
    received: (state, action: PayloadAction<FaqPageSettingsResponse>) => {
      state.data = new FaqPageSettingsModel(action.payload).getSerializable();
    },
  },
});

export default faqPageSettings.reducer;
export const faqPageSettingsDataReceived = faqPageSettings.actions.received;

export const selectFaqPageSettings = (state: RootState): FaqPageSettings =>
  state.faqPageSettings.data;
