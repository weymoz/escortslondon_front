import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import {
  Service,
  ServiceResponse,
  MenuItem,
  FilterApiEscortsByServiceResponse,
  EscortFiltered,
  ServicePageSettingsResponse,
  ServicePageSettings,
} from "@typedefs/app";
import ServiceModel from "@models/Service";
import EscortsFilteredModel from "@models/EscortFilteredModel";
import { apiCallBegan, filterApiCallBegan } from "./api";
import { RootState } from "./reducer";
import ServicePageSettingsModel from "@models/ServicePageSettingsModel";

export interface ServiceStateSlice {
  info: ServiceInfoSlice;
  escorts: EscortsByNameSlice;
}

export interface ServiceInfoSlice {
  data: ServicePageSettings | null;
  loading: boolean;
  error: boolean;
}

export interface EscortsByNameSlice {
  title?: string;
  list: EscortFiltered[] | null;
  total: number;
  skip: number;
  loading: boolean;
  error: boolean;
}

const service = createSlice({
  name: "service",
  initialState: {
    info: {
      data: null,
      loading: false,
      error: false,
    },
    escorts: {
      list: [],
      total: 0,
      skip: 0,
      loading: false,
      error: false,
    },
  } as ServiceStateSlice,
  reducers: {
    serviceRequested: (state) => {
      state.info.loading = true;
      state.info.error = false;
    },
    serviceError: (state) => {
      state.info.loading = false;
      state.info.error = true;
    },
    servicesReceived: (
      state,
      action: PayloadAction<ServicePageSettingsResponse>
    ) => {
      /*
      state.info.data = new ServiceModel(
        action.payload.items[0]
      ).getSerializable();
       */
      state.info.data = new ServicePageSettingsModel(
        action.payload
      ).getSerializable();
      state.info.loading = false;
      state.info.error = false;
    },

    escortsReceived: (
      state,
      action: PayloadAction<FilterApiEscortsByServiceResponse>
    ) => {
      action.payload.items.forEach((item) =>
        state.escorts.list?.push(
          new EscortsFilteredModel(item).getSerializable()
        )
      );
      state.escorts.loading = false;
      state.escorts.error = false;
      state.escorts.skip = state.escorts.list?.length || 0;
      state.escorts.total = action.payload.total;
    },
    escortsRequested: (state) => {
      state.escorts.loading = true;
      state.escorts.error = false;
    },
    escortsError: (state) => {
      state.escorts.error = true;
    },

    escortsClean: (state) => {
      state.escorts.list = [];
      state.escorts.total = 0;
      state.escorts.skip = 0;
    },
  },
});

export default service.reducer;

export const escortsByServiceClean = service.actions.escortsClean;

export const servicesReceived = service.actions.servicesReceived;

export const addServiceInfo = (slug: string) => {
  return apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      content_type: "service",
      "fields.slug": slug,
    },
    onSuccess: service.actions.servicesReceived.type,
    onError: service.actions.serviceError.type,
    onStart: service.actions.serviceRequested.type,
  });
};

export const addEscortsByService = (
  slug: string,
  skip: number,
  limit: number
) =>
  filterApiCallBegan({
    method: "get",
    url: "/service",
    params: {
      slug,
      skip,
      limit,
    },
    onError: service.actions.escortsError.type,
    onStart: service.actions.escortsRequested.type,
    onSuccess: service.actions.escortsReceived.type,
  });

export const escortsByServiceReceived = service.actions.escortsReceived;

// Selectors

export const selectServiceInfo = createSelector<
  RootState,
  ServicePageSettings | null,
  boolean,
  boolean,
  ServiceInfoSlice
>(
  (state) => state.service.info.data,
  (state) => state.service.info.loading,
  (state) => state.service.info.error,
  (data, loading, error) => ({ data, loading, error })
);

export const selectServicePageData = (state: RootState): ServicePageSettings =>
  state.service.info.data;

export const selectEscortsByService = createSelector<
  RootState,
  string,
  EscortFiltered[] | null,
  boolean,
  boolean,
  number,
  number,
  EscortsByNameSlice
>(
  (state) => state.service.info.data?.title || "",
  (state) => state.service.escorts.list,
  (state) => state.service.escorts.loading,
  (state) => state.service.escorts.error,
  (state) => state.service.escorts.skip,
  (state) => state.service.escorts.total,
  (title, list, loading, error, skip, total) => ({
    title,
    list,
    loading,
    error,
    skip,
    total,
  })
);
