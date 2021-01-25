import TermsPageSettingsModel from "@models/TermsPageSettingsModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TermsPageSettings, TermsPageSettingsResponse } from "@typedefs/app";
import { RootState } from "./reducer";

interface TermsPageSettingsStateSlice {
  data: TermsPageSettings | null;
}

const termsPageSettings = createSlice({
  name: "termsPageSettings",
  initialState: {
    data: null,
  } as TermsPageSettingsStateSlice,
  reducers: {
    received: (state, action: PayloadAction<TermsPageSettingsResponse>) => {
      state.data = new TermsPageSettingsModel(action.payload).getSerializable();
    },
  },
});

export default termsPageSettings.reducer;
export const termsPageSettingsDataReceived = termsPageSettings.actions.received;

export const selectTermsPageSettings = (state: RootState): TermsPageSettings =>
  state.termsPageSettings.data;
