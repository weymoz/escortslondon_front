import { RatesPerPlaceData } from "./escorts";
import {
  EscortsFilterOptions,
  EscortsFilterOptionsPayload,
  EscortsFilterRequestParams,
} from "./../components/pages/Main/Hero/types";
import { apiCallBegan, filterApiCallBegan } from "./api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findTag, formatLocation } from "./helpers";
import { PLACEHOLDER_IMG } from "./config";
import { EscortIndexed } from "./types";

export interface Escort {
  id: string;
  title?: string;
  titleMetaTag: string;
  metaDescriptionTag: string;
  imageId?: string;
  imageUrl?: string;
  additionalImageIds?: string[];
  additionalImageUrls?: (string | undefined)[];
  age?: number;
  nationality?: string;
  orientation?: string;
  bodyType?: string;
  bust?: string;
  hair?: string;
  height?: string;
  language?: string;
  about?: string;
  notice?: string[];
  rates?: RatesData;
  incallPrice?: string;
  outcallPrice?: string;
  location?: LocationData;
  newTag?: boolean;
  recommendedTag?: boolean;
  updatedAt?: string;
  services?: string[];
}

export interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

export interface EscortsData {
  items: EscortData[];
  includes: {
    Asset: AssetIncludesData[];
  };
  total: number;
}

export interface AssetIncludesData {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export type ContentTypes = "image/jpeg" | "video/mp4";

export interface EscortData {
  sys: {
    id: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug?: string;
    titleMetaTag?: string;
    metaDescriptionTag?: string;
    nationality: string;
    orientation: string;
    bodyType: string;
    age: number;
    hair: string;
    bust: string;
    height: string;
    language: string;
    notice: string;
    location: LocationData;
    services: string[];
    tags: string[];
    photos: AssetData[];
    photosAdditiona: AssetData[];
    about: string;
    rates: RatesData;
  };
}

export interface AssetData {
  sys: {
    type: string;
    linkType: string;
    id: string;
  };
}

export interface RatesData {
  eur?: RatesPerTimeData;
  gbp: RatesPerTimeData;
  usd?: RatesPerTimeData;
}

export interface RatesPerTimeData {
  "1_One hour": RatesPerPlaceData;
  "3_Two hours": RatesPerPlaceData;
  "6_Overnight": RatesPerPlaceData;
  "2_90 minutes": RatesPerPlaceData;
  "4_Three hours": RatesPerPlaceData;
  "5_Additional hour": RatesPerPlaceData;
}

export type EscortDateDuration = keyof RatesPerTimeData;

export interface RatesPerPlaceData {
  incall?: number | string;
  outcall?: number | string;
}

export type EscortDateType = keyof RatesPerPlaceData;
//Helpers

// Data Transformers
export const getEscorts = (e: EscortsData): Escort[] => {
  //Get link to escorts assets
  const assets = e.includes.Asset;

  return e.items.map(
    ({ sys: { id }, fields: { title, location, photos, rates, tags } }) => {
      const imageId =
        photos && photos.length > 0 && photos[0].sys.id
          ? photos[0].sys.id
          : undefined;
      const incallPrice = rates && rates?.gbp["1_One hour"].incall.toString();
      const outcallPrice = rates && rates?.gbp["1_One hour"].outcall.toString();
      const newTag = (tags && findTag(tags, "new")) || null;
      const recommendedTag = (tags && findTag(tags, "recommended")) || null;

      let imageUrl = assets.find((asset) => asset.sys.id === imageId)?.fields
        .file.url;
      if (!imageUrl) {
        imageUrl = PLACEHOLDER_IMG;
      }

      return {
        id: id || "",
        title: title || "",
        imageId: imageId || "",
        imageUrl: imageUrl || "",
        incallPrice: incallPrice || "",
        outcallPrice: outcallPrice || "",
        location: formatLocation(location),
        newTag,
        recommendedTag,
      };
    }
  );
};

const getEscortsFiltered = (data: EscortIndexed[]): Escort[] =>
  data.map(
    ({
      id,
      imageUrl,
      incallRate,
      title,
      location,
      outcallRate,
      newTag,
      recommendedTag,
    }) => ({
      id,
      imageUrl,
      title,
      location: { name: location, lat: 0, lng: 0 },
      rates: { gbp: { ["1_One hour"]: { incall: incallRate } } },
      incallPrice: incallRate.toString(),
      outcallPrice: outcallRate.toString(),
      newTag,
      recommendedTag,
    })
  );

// Slice

type SliceState = {
  list: Escort[];
  total: number;
  limit: number;
  skip: number;
  loading: boolean;
  showFiltered: boolean;
  filterOptions: EscortsFilterOptions;
  filterRequestParams: EscortsFilterRequestParams;
  showByName: boolean;
};

const escorts = createSlice({
  name: "escorts",
  initialState: {
    list: [],
    limit: 24,
    total: 0,
    skip: 0,
    loading: false,
    showFiltered: false,
    filterOptions: {
      location: [],
      price: [],
      services: [],
      physique: [],
      new_tag: false,
      recommended_tag: false,
    },
    filterRequestParams: {
      location: [],
      price: [],
      services: [],
      hair: [],
      boobs: [],
      body: [],
      new_tag: false,
      recommended_tag: false,
    },
    showByName: false,
  } as SliceState,
  reducers: {
    escortsRequested: (escorts) => {
      escorts.loading = true;
    },
    escortsRequestError: (escorts) => {
      escorts.loading = false;
      escorts.showByName = false;
    },
    escortsReceived: (escorts, action: PayloadAction<EscortsData>) => {
      if (action.payload.items.length === 0) return;

      const receivedEscorts = getEscorts(action.payload);
      receivedEscorts.forEach((escort) => escorts.list.push(escort));

      escorts.loading = false;

      escorts.skip += escorts.limit;

      escorts.showFiltered = false;

      escorts.total = action.payload.total;

      //Clean filter options
      for (const key in escorts.filterOptions) {
        const optKey = key as keyof EscortsFilterOptions;
        if (escorts.filterOptions[optKey]) {
          escorts.filterOptions[optKey] = [];
        }
      }

      //Clean filter params
      for (const key in escorts.filterRequestParams) {
        const optKey = key as keyof EscortsFilterRequestParams;
        if (escorts.filterRequestParams[optKey]) {
          escorts.filterRequestParams[optKey] = [];
        }
      }
    },

    cleanAllFilters: (escorts) => {
      //Clean filter options
      for (const key in escorts.filterOptions) {
        const optKey = key as keyof EscortsFilterOptions;
        if (escorts.filterOptions[optKey]) {
          escorts.filterOptions[optKey] = [];
        }
      }

      //Clean filter params
      for (const key in escorts.filterRequestParams) {
        const optKey = key as keyof EscortsFilterRequestParams;
        if (escorts.filterRequestParams[optKey]) {
          escorts.filterRequestParams[optKey] = [];
        }
      }
    },

    cleanEscorts: (escorts) => {
      escorts.list = [];
      escorts.limit = 24;
      escorts.skip = 0;
      escorts.total = 0;
      escorts.filterOptions = {
        location: [],
        price: [],
        services: [],
        physique: [],
        new_tag: false,
        recommended_tag: false,
      };
      escorts.filterRequestParams = {
        location: [],
        price: [],
        services: [],
        hair: [],
        boobs: [],
        body: [],
        new_tag: false,
        recommended_tag: false,
      };
    },

    setEscortsFilterOptions: (
      escorts,
      action: PayloadAction<EscortsFilterOptionsPayload>
    ) => {
      const name = action.payload.name;

      escorts.filterOptions[name as keyof EscortsFilterOptions] =
        action.payload.options || [];

      if (name === "physique") {
        ["body", "hair", "boobs"].forEach((paramName) => {
          const filteredOptions = action.payload.options
            .filter((option) => option.type === paramName)
            .map((option) => option.value);
          escorts.filterRequestParams[
            paramName as keyof EscortsFilterRequestParams
          ] = filteredOptions;
        });
      } else if (name === "new" || name === "recommended") {
        switch (name) {
          case "new":
            const newVal = !escorts.filterOptions.new_tag;
            escorts.filterOptions.new_tag = newVal;
            escorts.filterRequestParams.new_tag = newVal;
            break;
          case "recommended":
            escorts.filterOptions.recommended_tag = !escorts.filterOptions
              .recommended_tag;
            escorts.filterRequestParams.recommended_tag = !escorts
              .filterRequestParams.recommended_tag;
            break;
          default:
        }
      } else {
        escorts.filterRequestParams[
          name as keyof EscortsFilterRequestParams
        ] = action.payload.options.map((option) => option.value);
      }
    },

    escortsFilteredRequested: () => {},
    escortsFilteredRequestError: () => {},
    escortsFilteredReceived: (
      escorts,
      action: PayloadAction<EscortIndexed[]>
    ) => {
      escorts.list = getEscortsFiltered(action.payload);
      escorts.showFiltered = true;
    },

    searchByNameRequested: () => {},
    searchByNameReceived: (escorts, action: PayloadAction<EscortsData>) => {
      if (action.payload.items.length === 0) return;
      const receivedEscorts = getEscorts(action.payload);
      escorts.list = receivedEscorts;
    },
    searchByNameError: () => {},
  },
});

//Actions

export const escortsFilteredReceived = escorts.actions.escortsFilteredReceived;

export const escortsReceived = escorts.actions.escortsReceived;

export const cleanAllFilters = escorts.actions.cleanAllFilters;

export const addEscorts = ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}): ReturnType<typeof apiCallBegan> =>
  apiCallBegan({
    method: "get",
    url: "/entries",
    params: {
      content_type: "escorts",
      limit,
      skip,
    },
    onStart: escorts.actions.escortsRequested.type,
    onSuccess: escorts.actions.escortsReceived.type,
    onError: escorts.actions.escortsRequestError.type,
  });

export const filterEscorts = (
  params: EscortsFilterRequestParams
): ReturnType<typeof filterApiCallBegan> =>
  filterApiCallBegan({
    url: "/filter",
    method: "get",
    params,
    onError: escorts.actions.escortsFilteredRequestError.type,
    onStart: escorts.actions.escortsFilteredRequested.type,
    onSuccess: escorts.actions.escortsFilteredReceived.type,
  });

export default escorts.reducer;

export const searchByName = (query: string): ReturnType<typeof apiCallBegan> =>
  apiCallBegan({
    method: "get",
    url: "/entries",
    params: {
      content_type: "escorts",
      query,
    },
    onStart: escorts.actions.searchByNameRequested.type,
    onSuccess: escorts.actions.searchByNameReceived.type,
    onError: escorts.actions.searchByNameError.type,
  });

export const cleanEscorts = escorts.actions.cleanEscorts;
export const setEscortsFilterOptions = escorts.actions.setEscortsFilterOptions;
