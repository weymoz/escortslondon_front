import { smsApiCallBegan } from "@store/api";
import axios from "@store/client";
import { sendSms } from "@store/smsCode";
import { Middleware } from "redux";
import { RootState } from "../reducer";
import { SmsApiResponse } from "@typedefs/app";

export const sms: Middleware<{}, RootState> = ({ dispatch, getState }) => (
  next
) => async (action) => {
  if (action.type !== smsApiCallBegan.type) {
    return next(action);
  }
  next(action);
  const {
    baseURL,
    method,
    url,
    params,
    onStart,
    onError,
    onSuccess,
  } = action.payload;

  dispatch({ type: onStart });
  try {
    const {
      data,
      data: { hashCode },
    } = await axios.request<SmsApiResponse>({
      method,
      baseURL,
      url,
      params,
    });

    dispatch({ type: onSuccess, payload: hashCode });
    console.log(data);
  } catch (e) {
    console.error(e);
    dispatch({ type: onError });
  }
};

export default sms;
