import { Middleware } from "redux";
import { RootState } from "../reducer";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  startUpload,
  setUploadProgress,
  uploadSuccess,
  uploadError,
} from "@store/casting";
import axios from "@store/client";
import { CastingFormState, CasitngRates } from "@components/pages/Casting";
import ContentfulFileUploader from "./ContentfulUploader";
import { DataBuilder, AddEntryRequest, EscortEntryFields } from "./DataBuilder";
import { randomId } from "@functions/helpers";
import { Rates } from "@typedefs/app";

const CONT_ENVIRONMENT: string = process.env.NEXT_PUBLIC_CONT_ENVIRONMENT;
const CONT_SPACE_ID: string = process.env.NEXT_PUBLIC_CONT_SPACE_ID;
const CONT_MANAGEMENT_TOKEN: string =
  process.env.NEXT_PUBLIC_CONT_MANAGEMENT_TOKEN;

const uploader = new ContentfulFileUploader();

const uploadApi: Middleware<{}, RootState> = ({ dispatch }) => (next) => async (
  action: PayloadAction<CastingFormState>
) => {
  if (action.type !== startUpload.type) {
    return next(action);
  }

  const {
    name,
    age,
    passport,
    phone,
    email,
    nationality,
    orientation,
    bodyType,
    bust,
    height,
    services,
    about,
    notice,
    location,
    rates,
    galleryPhoto,
    portraitPhotos,
    verificationPhoto,
    landscapePhotos,
  } = action.payload;

  const percents = percentsOf(payloadSize(action.payload));

  let uploadProgress = 0;

  const upload = async (file: File): Promise<string> => {
    if (!file) return;
    const fileId = await uploader.upload(file);
    dispatch(setUploadProgress((uploadProgress += percents(file.size))));
    return fileId;
  };

  const uploadMulty = async (
    files: typeof landscapePhotos
  ): Promise<string[]> => {
    let fileIds: Promise<string>[] = [];
    for (const key in files) {
      const file = files[key] as File;
      if (file) fileIds.push(upload(file));
    }
    return Promise.all(fileIds);
  };

  const galleryPhotoId = await upload(galleryPhoto);
  const passportId = await upload(passport);
  const portraitPhotoIds = await uploadMulty(portraitPhotos);
  const verificationPhotoId = await upload(verificationPhoto);
  const landscapePhotoIds = await uploadMulty(landscapePhotos);

  const data: AddEntryRequest<EscortEntryFields> = new DataBuilder<
    EscortEntryFields
  >()
    .addTextField("approved", "No")
    .addTextField("title", `[CASTING ${randomId()}] ${name}`)
    .addTextField("age", (age && age.value) || 0)
    .addTextField("about", about)
    .addTextField("notice", notice)
    .addTextField("email", email)
    .addObjectField("location", location)
    .addObjectField("rates", prepareRates(rates))
    .addTextField("phone", phone)
    .addLinkField("passport", passportId)
    .addTextField("nationality", (nationality && nationality.value) || "")
    .addTextField("orientation", (orientation && orientation.value) || "")
    .addTextField("bodyType", (bodyType && bodyType.value) || "")
    .addTextField("bust", (bust && bust.value) || "")
    .addTextField("height", (height && height.value) || "")
    .addTextField("services", services || [])
    .addLinksArrayField(
      "photosAdditiona",
      [...portraitPhotoIds, verificationPhotoId, ...landscapePhotoIds],
      "Asset"
    )
    .addLinksArrayField("photos", [galleryPhotoId], "Asset").data;

  try {
    const response = await axios({
      url: `https://api.contentful.com/spaces/${CONT_SPACE_ID}/environments/${CONT_ENVIRONMENT}/entries`,
      method: "post",
      headers: {
        "Content-Type": "application/vnd.contentful.management.v1+json",
        Authorization: `Bearer ${CONT_MANAGEMENT_TOKEN}`,
        "X-Contentful-Content-Type": "escorts",
      },
      data,
    });

    console.log(response);
    dispatch(setUploadProgress(100));
    setTimeout(() => {
      dispatch(uploadSuccess());
    }, 1000);
  } catch (e) {
    console.error(e);
    dispatch(uploadError());
  }
};

export default uploadApi;

const percentsOf = (totalSize: number) => (fileSie: number) =>
  Math.floor((fileSie / totalSize) * 100);

function payloadSize({
  galleryPhoto,
  passport,
  portraitPhotos,
  verificationPhoto,
  landscapePhotos,
}: CastingFormState): number {
  let totalSize = 0;

  if (galleryPhoto) {
    totalSize += galleryPhoto.size;
  }

  if (passport) {
    totalSize += passport.size;
  }

  if (portraitPhotos) {
    for (const key in portraitPhotos) {
      const currentPhoto = portraitPhotos[key] as File;
      if (currentPhoto) {
        totalSize += currentPhoto.size;
      }
    }
  }

  if (verificationPhoto) {
    totalSize += verificationPhoto.size;
  }

  if (landscapePhotos) {
    for (const key in landscapePhotos) {
      const currentPhoto = landscapePhotos[key] as File;
      if (currentPhoto) {
        totalSize += currentPhoto.size;
      }
    }
  }
  return totalSize;
}

const prepareRates = (rates: CasitngRates): Rates => {
  const { incall, outcall } = rates;
  const output = {
    gbp: {
      "1_One hour": {
        incall: incall["One hour"],
        outcall: outcall["One hour"],
      },
      "2_90 minutes": {
        incall: incall["90 minutes"],
        outcall: outcall["90 minutes"],
      },
      "3_Two hours": {
        incall: incall["Two hours"],
        outcall: outcall["Two hours"],
      },
      "4_Three hours": {
        incall: "0",
        outcall: "0",
      },
      "5_Additional hour": {
        incall: incall["Additional hour"],
        outcall: incall["Additional hour"],
      },
      "6_Overnight": {
        incall: incall["Overnight"],
        outcall: outcall["Overnight"],
      },
    },
    usd: {
      "1_One hour": {
        incall: "0",
        outcall: "0",
      },
      "2_90 minutes": {
        incall: "0",
        outcall: "0",
      },
      "3_Two hours": {
        incall: "0",
        outcall: "0",
      },
      "4_Three hours": {
        incall: "0",
        outcall: "0",
      },
      "5_Additional hour": {
        incall: "0",
        outcall: "0",
      },
      "6_Overnight": {
        incall: "0",
        outcall: "0",
      },
    },
    eur: {
      "1_One hour": {
        incall: "0",
        outcall: "0",
      },
      "2_90 minutes": {
        incall: "0",
        outcall: "0",
      },
      "3_Two hours": {
        incall: "0",
        outcall: "0",
      },
      "4_Three hours": {
        incall: "0",
        outcall: "0",
      },
      "5_Additional hour": {
        incall: "0",
        outcall: "0",
      },
      "6_Overnight": {
        incall: "0",
        outcall: "0",
      },
    },
  };
  return output;
};
