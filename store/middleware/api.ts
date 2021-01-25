import axios from "../client";
import { RootState } from "../reducer";
import { PayloadAction, Middleware, Action, Store } from "@reduxjs/toolkit";
import {
  apiCallSuccess,
  apiCallBegan,
  apiCallFailed,
  ApiCallBeganPayload,
  filterApiCallBegan,
  filterApiCallSuccess,
  filterApiCallFailed,
} from "./../api";

export interface PayloadWithMeta<T> {
  meta?: T;
}

const api: Middleware<
  (
    action: PayloadAction<ApiCallBeganPayload | any>
  ) => Promise<any> | undefined,
  RootState
> = ({ dispatch }: Store) => (nextMiddleware) => async (
  action: PayloadAction<ApiCallBeganPayload, string, number>
) => {
  if (
    action.type !== apiCallBegan.type &&
    action.type !== filterApiCallBegan.type
  ) {
    return nextMiddleware(action);
  }

  const {
    url,
    method,
    onStart,
    onSuccess,
    onError,
    params,
    baseParams,
    baseURL,
  } = action.payload;

  const meta = action.meta;

  if (onStart) dispatch({ type: onStart });

  nextMiddleware(action);

  try {
    const { data, config } = await axios.request({
      method,
      baseURL,
      url,
      params: {
        ...baseParams,
        ...params,
      },
    });
    //Dispatch default actions indicating success of the api fetching
    if (action.type === apiCallBegan.type) {
      dispatch(apiCallSuccess({ url: config.url, method: config.method }));
    } else if (action.type === filterApiCallBegan.type) {
      dispatch(filterApiCallSuccess());
    }

    //Dispatch addinional onSuccess actions
    if (Array.isArray(onSuccess)) {
      onSuccess.forEach((actionType) =>
        dispatch({ type: actionType, payload: data, meta })
      );
    } else {
      dispatch({ type: onSuccess, payload: data, meta });
    }
  } catch (e) {
    if (action.type === apiCallBegan.type) {
      dispatch(apiCallFailed({ meta }));
    } else if (action.type === filterApiCallBegan.type) {
      dispatch(filterApiCallFailed());
    }
    if (onError) dispatch({ type: onError });
  }
};

export default api;
