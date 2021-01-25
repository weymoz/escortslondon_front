import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { EscortsDuo, EscortsDuoResponse } from "@typedefs/app";
import EscortsDuoModel from "@models/EscortsDuoModel";
import { apiCallBegan } from "./api";
import { RootState } from "./reducer";

export interface DuoProfileStateSlice {
  data: EscortsDuo | null;
  updatedAt: string;
}

const duoProfile = createSlice({
  name: "duoProfile",
  initialState: {
    data: null,
    updatedAt: null,
  } as DuoProfileStateSlice,
  reducers: {
    duoProfileRequested: () => {},
    duoProfileError: () => {},
    duoProfileReceived: (
      duoProfile,
      action: PayloadAction<EscortsDuoResponse>
    ) => {
      duoProfile.data = new EscortsDuoModel(
        action.payload.items[0],
        action.payload.includes
      ).getSerializable();
    },
    cleanDuoProfile: (duoProfile) => {
      duoProfile.data = null;
    },
  },
});

export default duoProfile.reducer;

export const duoProfileReceived = duoProfile.actions.duoProfileReceived;

export const addDuoProfile = (slug: string) =>
  apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      content_type: "escortsDuo",
      "fields.slug": slug,
    },
    onSuccess: duoProfile.actions.duoProfileReceived.type,
    onError: duoProfile.actions.duoProfileError.type,
    onStart: duoProfile.actions.duoProfileRequested.type,
  });

export const cleanDuoProfile = duoProfile.actions.cleanDuoProfile;

// Selectors
const getEscort1Gallery = (state: EscortsDuo) => state.escort_1?.gallery;

export const selectEscort1GalleryLength = createSelector<
  EscortsDuo,
  string[] | undefined,
  number
>([getEscort1Gallery], (gallery: string[] | undefined) => gallery?.length || 0);

export const selectEscortsDuoProfile = (state: RootState): EscortsDuo =>
  state.duoProfile.data;
