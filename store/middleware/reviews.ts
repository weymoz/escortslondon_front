import { Middleware } from "redux";
import { RootState } from "@store/reducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { SubmitReviewState } from "@simple/ReviewAddModal";
import { submitReview, submitionSuccess } from "@store/reviews";
import axios from "@store/client";
import { DataBuilder } from "./DataBuilder";
import {
  CreateReviewEntryFields,
  ContentfulItem,
  ContentfulUpdateEntryRequest,
} from "@typedefs/app";
import { setSubmitionProgress, submitionError } from "@store/reviews";

const CONT_ENVIRONMENT: string = process.env.NEXT_PUBLIC_CONT_ENVIRONMENT;
const CONT_SPACE_ID: string = process.env.NEXT_PUBLIC_CONT_SPACE_ID;
const CONT_MANAGEMENT_TOKEN: string =
  process.env.NEXT_PUBLIC_CONT_MANAGEMENT_TOKEN;

const reviews: Middleware<{}, RootState> = ({ dispatch, getState }) => (
  next
) => async (action: PayloadAction<SubmitReviewState>) => {
  //  if (!action.type) return;
  if (action.type !== submitReview.type) {
    return next(action);
  }
  next(action);
  const { phone, rating, visitType, time, duration, comment } = action.payload;
  const escortId = getState().profile.data?.id;

  //Prepare review entry data
  const reviewEntryData = new DataBuilder<CreateReviewEntryFields>()
    .addTextField(
      "title",
      `${getState()?.profile?.data?.title} | ${
        visitType.value
      } | rating ${rating} | ${comment.slice(0, 15)}...`
    )
    .addTextField("rating", rating)
    .addTextField("time", time.value)
    .addTextField("duration", duration.value)
    .addTextField("content", comment)
    .addLinkField("escort", escortId, "Entry")
    .addTextField("phone", `+${phone}`)
    .addTextField("visitType", visitType.value).data;

  try {
    dispatch(setSubmitionProgress(0));

    const reviewId = await createReviewEntry(reviewEntryData);
    dispatch(setSubmitionProgress(20));

    const escortEntryData = await getEntryData(escortId);
    dispatch(setSubmitionProgress(40));

    await updateEntry(escortEntryData, reviewId);
    dispatch(setSubmitionProgress(60));

    /*
    await publishEntry(reviewId);
    dispatch(setSubmitionProgress(80));
    */

    await publishEntry(escortEntryData.sys.id, escortEntryData.sys.version + 1);
  } catch (e) {
    console.log(e);
    //dispatch(submitionError());
    return;
  } finally {
    dispatch(setSubmitionProgress(100));

    setTimeout(() => {
      dispatch(submitionSuccess(true));
    }, 600);
  }
};

export default reviews;

const createReviewEntry = async (data: any): Promise<string> => {
  const response = await axios({
    url: `https://api.contentful.com/spaces/${CONT_SPACE_ID}/environments/${CONT_ENVIRONMENT}/entries`,
    method: "post",
    headers: {
      "Content-Type": "application/vnd.contentful.management.v1+json",
      Authorization: `Bearer ${CONT_MANAGEMENT_TOKEN}`,
      "X-Contentful-Content-Type": "review",
    },
    data,
  });
  return (response.data as ContentfulItem).sys.id;
};

const getEntryData = async (entryId: string): Promise<ContentfulItem> => {
  const response = await axios({
    url: `https://api.contentful.com/spaces/${CONT_SPACE_ID}/environments/${CONT_ENVIRONMENT}/entries/${entryId}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${CONT_MANAGEMENT_TOKEN}`,
    },
  });

  return response.data as ContentfulItem;
};

const updateEntry = async (
  entryData: ContentfulUpdateEntryRequest,
  reviewId: string
): Promise<any> => {
  const currentReviews =
    entryData.fields.reviews && entryData.fields.reviews["en-US"]
      ? entryData.fields.reviews["en-US"]
      : [];

  const updatedReviews = [
    {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: reviewId,
      },
    },
    ...currentReviews,
  ];

  entryData.fields.reviews = { ["en-US"]: updatedReviews };

  const response = await axios({
    url: `https://api.contentful.com/spaces/${CONT_SPACE_ID}/environments/${CONT_ENVIRONMENT}/entries/${entryData.sys.id}`,
    method: "put",
    headers: {
      "Content-Type": "application/vnd.contentful.management.v1+json",
      Authorization: `Bearer ${CONT_MANAGEMENT_TOKEN}`,
      "X-Contentful-Content-Type": "escorts",
      "X-Contentful-Version": entryData.sys.version,
    },
    data: entryData,
  });
  return response.data as ContentfulItem;
};

const publishEntry = async (
  entryId: string,
  entryVersion: number = 1
): Promise<any> => {
  //For unknown yet reason axios throws an error while response status is 200 ok
  try {
    const response = await axios({
      url: `https://api.contentful.com/spaces/${CONT_SPACE_ID}/environments/${CONT_ENVIRONMENT}/entries/${entryId}/published`,
      method: "put",
      headers: {
        "Content-Type": "application/vnd.contentful.management.v1+json",
        Authorization: `Bearer ${CONT_MANAGEMENT_TOKEN}`,
        "X-Contentful-Version": entryVersion,
      },
    });
    return response.data as ContentfulItem;
  } catch (e) {}
};
