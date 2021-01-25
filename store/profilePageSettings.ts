import EscortsDuoPageSettingsModel from "@models/EscortsDuoPageSettingsModel";
import ProfilePageSettingsModel from "@models/ProfilePageSettingsModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProfilePageSettings,
  ProfilePageSettingsResponse,
} from "@typedefs/app";
import { RootState } from "./reducer";

interface EscortsDuoPageSettingsStateSlice {
  data: ProfilePageSettings | null;
}

const profilePageSettings = createSlice({
  name: "profilePageSettings",
  initialState: {
    data: null,
  } as EscortsDuoPageSettingsStateSlice,
  reducers: {
    received: (state, action: PayloadAction<ProfilePageSettingsResponse>) => {
      state.data = new ProfilePageSettingsModel(
        action.payload
      ).getSerializable();
    },
  },
});

export default profilePageSettings.reducer;

export const profilePageSettingsDataReceived =
  profilePageSettings.actions.received;

export const selectProfilePageSettings = (
  state: RootState
): ProfilePageSettings => state.profilePageSettings.data;
