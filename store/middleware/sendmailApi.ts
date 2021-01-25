import { ApiCallBeganPayload, sendmailApiCallBegan } from "./../api";
import { PayloadAction, Dispatch, Middleware, Store } from "@reduxjs/toolkit";
import axios from "@store/client";
import { RootState } from "@store/reducer";
import { Escort } from "@store/escorts";
import moment from "moment";

const sendmailApi = ({ dispatch, getState }: Store<RootState>) => (
  next
) => async (action: PayloadAction<ApiCallBeganPayload>) => {
  if (action.type !== sendmailApiCallBegan.type) {
    return next(action);
  }
  debugger;
  const {
    escortDate: {
      escort1: { data: escortData },
      datePrice,
      step3: {
        value: { name, email, phone, comment },
      },
      selectedAddress,
      date,
      time,
      duration: { label: duration },
      dateType,
    },
  } = getState() as RootState;

  const { title } = escortData as Escort;

  const postData = {
    title,
    dateType,
    datePrice,
    date: moment(date).format("MMM DD YYYY"),
    time: moment(time).format("h:mm a"),
    duration,
    name,
    email,
    phone,
    comment,
    selectedAddress,
  };

  const { url, method, baseParams, baseURL } = action.payload;

  next(action);

  const { data, config } = await axios.post(url, postData, {
    params: { ...baseParams },
    baseURL,
  });
};

export default sendmailApi;
