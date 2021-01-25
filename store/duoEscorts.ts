import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EscortsDuo,
  EscortsDuoResponse,
  FilterApiEscortsDuoResponse,
} from "@typedefs/app";
import { apiCallBegan, filterApiCallBegan } from "./api";
import EscortsDuoModel from "@models/EscortsDuoModel";
import { DuoEscortsFilterRequestParams } from "@typedefs/app";

export interface EscortsDuoStateSlice {
  list: EscortsDuo[];
  skip: number;
  total: number;
  allLoaded: boolean;
}

const escortsDuo = createSlice({
  name: "escortsDuo",
  initialState: {
    list: [],
    skip: 0,
    total: 0,
    allLoaded: false,
  } as EscortsDuoStateSlice,
  reducers: {
    escortsDuoRequested: () => {},
    escortsDuoError: () => {},
    escortsDuoReceived: (
      escortsDuo,
      action: PayloadAction<EscortsDuoResponse>
    ) => {
      action.payload.items.forEach((item) => {
        escortsDuo.list.push(
          new EscortsDuoModel(item, action.payload.includes).getSerializable()
        );
      });
      escortsDuo.skip += 24;
      escortsDuo.total = action.payload.total;

      if (escortsDuo.list.length >= escortsDuo.total) {
        escortsDuo.allLoaded = true;
      } else {
        escortsDuo.allLoaded = false;
      }
    },

    escortsDuoFilteredRequestError: () => {},
    escortsDuoFilteredRequested: () => {},
    escortsDuoFilteredReceived: (
      state,
      action: PayloadAction<EscortsDuo[]>
    ) => {
      state.list = action.payload;
      state.allLoaded = true;
    },

    cleanDuoEscorts: (state) => {
      state.list = [];
      state.skip = 0;
      state.allLoaded = false;
      state.total = 0;
    },
  },
});

export default escortsDuo.reducer;

export const escortsDuoReceived = escortsDuo.actions.escortsDuoReceived;

export const cleanDuoEscorts = escortsDuo.actions.cleanDuoEscorts;

export const addEscortsDuo = (limit: number = 24, skip: number = 0) =>
  apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      content_type: "escortsDuo",
      limit,
      skip,
    },
    onStart: escortsDuo.actions.escortsDuoRequested.type,
    onError: escortsDuo.actions.escortsDuoError.type,
    onSuccess: escortsDuo.actions.escortsDuoReceived.type,
  });

export const filterDuoEscorts = (
  params: DuoEscortsFilterRequestParams
): ReturnType<typeof filterApiCallBegan> =>
  filterApiCallBegan({
    url: "/duo-filter",
    method: "get",
    params,
    onError: escortsDuo.actions.escortsDuoFilteredRequestError.type,
    onStart: escortsDuo.actions.escortsDuoFilteredRequested.type,
    onSuccess: escortsDuo.actions.escortsDuoFilteredReceived.type,
  });
