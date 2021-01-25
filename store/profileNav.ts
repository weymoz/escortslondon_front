import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EscortsData } from "./escorts";
import { apiCallBegan, ApiCallBeganPayload } from "./api";
import { EscortsDuoResponse } from "@typedefs/app";

interface StateSlice {
  nextTitle: string;
  prevTitle: string;
  nextSlug: string;
  prevSlug: string;
  loading: boolean;
}

const profileNav = createSlice({
  name: "profileNav",
  initialState: {
    nextTitle: "",
    prevTitle: "",
    nextSlug: "",
    prevSlug: "",
    loading: false,
  } as StateSlice,
  reducers: {
    nextProfileRequested: (profile) => {},
    nextProfileError: (profile) => {},
    prevProfileRequested: (profile) => {},
    prevProfileError: (profile) => {},

    nextProfileReceived: (
      profileNav,
      action: PayloadAction<EscortsData | EscortsDuoResponse>
    ) => {
      profileNav.nextTitle = action.payload?.items[0]?.fields.title;
      profileNav.nextSlug = action.payload.items[0]?.fields.slug;
    },
    prevProfileReceived: (
      profileNav,
      action: PayloadAction<EscortsData | EscortsDuoResponse>
    ) => {
      profileNav.prevTitle = action.payload?.items.reverse()[0]?.fields.title;
      profileNav.prevSlug = action.payload?.items.reverse()[0]?.fields.slug;
    },
  },
});

export default profileNav.reducer;

export const addNextProfile = (
  updatedAt: string,
  contentType: string = "escorts"
): PayloadAction<ApiCallBeganPayload> => {
  return apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      content_type: contentType,
      "sys.updatedAt[lt]": updatedAt,
    },
    onSuccess: profileNav.actions.nextProfileReceived.type,
    onError: profileNav.actions.nextProfileError.type,
    onStart: profileNav.actions.nextProfileRequested.type,
  });
};

export const addPrevProfile = (
  updatedAt: string,
  contentType: string = "escorts"
): PayloadAction<ApiCallBeganPayload> => {
  return apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      content_type: contentType,
      "sys.updatedAt[gt]": updatedAt,
    },
    onSuccess: profileNav.actions.prevProfileReceived.type,
    onError: profileNav.actions.prevProfileError.type,
    onStart: profileNav.actions.prevProfileRequested.type,
  });
};
