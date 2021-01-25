import { HttpMetod } from "./types";
import { createAction, PrepareAction } from "@reduxjs/toolkit";

export const contentfulBaseURL = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONT_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONT_ENVIRONMENT}`;
export const contentfulBaseParams = {
  access_token: process.env.NEXT_PUBLIC_CONT_ACCESS_TOKEN,
};

const googleMapsGeocodeBaseUrl =
  "https://maps.googleapis.com/maps/api/geocode/json";
const googleMapsGeocodeBaseParams = {
  key: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY,
};

export type Params = { [k: string]: string | string[] | number };

export interface ApiCallBeganPayload {
  url: string;
  method: HttpMetod;
  params?: Params;
  onStart?: string;
  onSuccess?: string[] | string;
  onError?: string;
  baseURL?: string;
  baseParams?: Params;
  meta?: any;
}

export interface ApiCallSuccessPayload {
  url: string | undefined;
  method?: string;
}
export const apiCallBegan = createAction<PrepareAction<ApiCallBeganPayload>>(
  "api/callBegan",
  (payload: ApiCallBeganPayload) => {
    const meta = payload.meta;
    delete payload.meta;
    return {
      payload: {
        ...payload,
        baseURL: contentfulBaseURL,
        baseParams: contentfulBaseParams,
      },
      meta,
    };
  }
);
export const apiCallSuccess = createAction<ApiCallSuccessPayload>(
  "api/callSuccess"
);

export interface ApiCallFailedPayload {
  meta?: any;
}
export const apiCallFailed = createAction<ApiCallFailedPayload>(
  "api/callFailed"
);

// Google maps API
export const googleMapsApiCallBegan = createAction<
  PrepareAction<ApiCallBeganPayload>
>("googleMapsApi/callBegan", (payload: ApiCallBeganPayload) => ({
  payload: {
    ...payload,
    baseURL: googleMapsGeocodeBaseUrl,
    baseParams: googleMapsGeocodeBaseParams,
  },
}));

//Contentful index API
export const filterApiCallSuccess = createAction("filterApi/callSuccess");
export const filterApiCallFailed = createAction("filterApi/callFailed");
export const filterApiCallBegan = createAction<
  PrepareAction<ApiCallBeganPayload>
>("filterApi/callBegan", (payload) => {
  return {
    payload: {
      ...payload,
      baseURL: process.env.NEXT_PUBLIC_ESCORTS_INDEX_BASE_URL_SSL + "/api",
    },
  };
});

//Sms API
export const smsApiCallBegan = createAction("smsApi/callBegan", (payload) => {
  return {
    payload: {
      ...payload,
      baseURL: process.env.NEXT_PUBLIC_ESCORTS_INDEX_BASE_URL,
    },
  };
});

export const sendmailApiCallBegan = createAction<
  PrepareAction<ApiCallBeganPayload>
>("sendmailApi/callBegan", (payload) => {
  return {
    payload: {
      ...payload,
      baseURL: process.env.NEXT_PUBLIC_ESCORTS_INDEX_BASE_URL + "/api",
      url: "/inform-order",
      method: "post",
    },
  };
});

export const duoSendmailApiCallBegan = createAction<
  PrepareAction<ApiCallBeganPayload>
>("duoSendmailApi/callBegan", (payload) => {
  return {
    payload: {
      ...payload,
      baseURL: process.env.NEXT_PUBLIC_ESCORTS_INDEX_BASE_URL + "/api",
      url: "/duo-inform-order",
      method: "post",
    },
  };
});

//Loqate API
export const addressApiCallSuccess = createAction("addressApi/callSuccess");
export const addressApiCallFailed = createAction("addressApi/callFailed");
export const addressApiCallBegan = createAction<
  PrepareAction<ApiCallBeganPayload>
>("addressApi/callBegan", (payload) => ({
  payload: {
    ...payload,
    baseURL: process.env.NEXT_PUBLIC_ADDRESS_API_BASE_URL,
    baseParams: {
      Key: process.env.NEXT_PUBLIC_ADDRESS_API_KEY,
    },
  },
}));
