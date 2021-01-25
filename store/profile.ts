import { Escort, EscortsData } from "@store/escorts";
import { apiCallBegan, ApiCallBeganPayload } from "./api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatLocation } from "./helpers";
import { PLACEHOLDER_IMG } from "./config";
import EscortPreviewModel from "@models/EscortPreviewModel";
import { CastingFormState } from "@pages/Casting";
import { Review, EscortsResponse } from "@typedefs/app";
import ReviewModel from "@models/ReviewModel";
import { RootState } from "./reducer";

//Transformers
export const getProfile = (e: EscortsData): Escort => {
  const assets = (e.includes && e.includes.Asset) || [];
  return e.items.map(
    ({
      sys: { id, updatedAt },
      fields: {
        title,
        titleMetaTag,
        metaDescriptionTag,
        location,
        photos,
        photosAdditiona,
        rates,
        age,
        hair,
        bust,
        notice: noticeData,
        about,
        height,
        language,
        nationality,
        orientation,
        bodyType,
        services,
      },
    }) => {
      const imageId =
        photos && photos.length > 0 && photos[0].sys.id
          ? photos[0].sys.id
          : undefined;

      let imageUrl = assets.find((asset) => asset.sys.id === imageId)?.fields
        .file.url;
      if (!imageUrl) {
        imageUrl = PLACEHOLDER_IMG;
      }

      const additionalImageUrls = assets
        .filter((asset) => asset.fields.file.contentType !== "video/mp4")
        .map((asset) => asset.fields.file.url)
        .filter((img) => img !== imageUrl);

      const notice = (noticeData && noticeData.split("\n")) || [];

      return {
        id: id || "",
        title: title || "",
        titleMetaTag: titleMetaTag || "",
        metaDescriptionTag: metaDescriptionTag || "",
        age: age || 0,
        hair: hair || "",
        bust: bust || "",
        notice: notice || [""],
        about: about || "",
        height: height || "",
        language: language || "",
        nationality: nationality || "",
        orientation: orientation || "",
        bodyType: bodyType || "",
        services: services || [""],
        imageId: imageId || "",
        imageUrl: imageUrl || "",
        additionalImageUrls: additionalImageUrls || [""],
        location: formatLocation(location),
        rates: rates || null,
        updatedAt: updatedAt || "",
      };
    }
  )[0];
};

interface SliceState {
  data: Escort | null;
  reviews: Review[];
  loading: boolean;
  nextProfile: string | null;
}

const profile = createSlice({
  name: "profile",
  initialState: {
    data: null,
    reviews: [],
    loading: false,
    nextProfile: null,
  } as SliceState,
  reducers: {
    profileRequested: (profile) => {
      profile.loading = true;
    },
    profileRequestError: (profile) => {
      profile.loading = false;
    },
    profileReceived: (profile, action: PayloadAction<EscortsData>) => {
      if (!action.payload) return profile;
      profile.data = getProfile(action.payload);
      profile.loading = false;

      const escortResponse = (action.payload as unknown) as EscortsResponse;

      const reviewsData = escortResponse.items[0]?.fields.reviews;
      if (reviewsData && reviewsData.length) {
        const reviews = reviewsData.map((reviewLink) =>
          new ReviewModel(reviewLink, escortResponse.includes).getSerializable()
        );
        profile.reviews = reviews.filter((review) => !!review.visitType);
      }
    },
    //???
    profileClean: (profile) => {
      profile.data = null;
      profile.reviews = [];
    },

    fillProfileWithCastingData: (
      profile,
      action: PayloadAction<CastingFormState>
    ) => {
      profile.data = new EscortPreviewModel(action.payload).preview;
    },
  },
});

export default profile.reducer;

export const profileReceived = profile.actions.profileReceived;

export const fillProfileWithCastingData =
  profile.actions.fillProfileWithCastingData;
export const profileClean = profile.actions.profileClean;

export const addProfile = (title: string): PayloadAction<ApiCallBeganPayload> =>
  apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      ["fields.title"]: title[0].toUpperCase() + title.slice(1),
      content_type: "escorts",
    },
    onError: profile.actions.profileRequestError.type,
    onStart: profile.actions.profileRequested.type,
    onSuccess: profile.actions.profileReceived.type,
  });

export const selectReviews = (state: RootState): Review[] => {
  return state.profile.reviews;
};

export const selectProfileData = (state: RootState): Escort =>
  state.profile.data;
