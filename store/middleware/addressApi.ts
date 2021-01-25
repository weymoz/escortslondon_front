import {
  addressApiCallBegan,
  ApiCallBeganPayload,
  addressApiCallSuccess,
  addressApiCallFailed,
} from './../api';
import { PayloadAction, Dispatch, Middleware, Store } from '@reduxjs/toolkit';
import axios from '@store/client';

export interface LoqateFindApiError {
  Error: string;
}

export interface LoqateFindApiData {
  Id?: string;
  Type: string;
  Text: string;
  Description: string;
}

export interface LoqateApiResponse {
  Items: LoqateFindApiError[] | LoqateFindApiData[];
}

const addressApi = ({ dispatch }: Store) => next => async (
  action: PayloadAction<ApiCallBeganPayload>,
) => {
  if (action.type !== addressApiCallBegan.type) {
    return next(action);
  }

  const {
    url,
    method,
    params,
    onError,
    onStart,
    onSuccess,
    baseParams,
    baseURL,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const { data, config } = await axios.request<LoqateApiResponse>({
      method,
      baseURL,
      url,
      params: {
        ...baseParams,
        ...params,
      },
    });

    if ('Error' in data.Items[0]) {
      throw data.Items;
    } else {
      let payload: string[] = [];

      if (data.Items.length !== 0) {
        payload = (await getAddresses(data, action.payload)).reduce(
          (acc, val) => {
            return acc.concat(val);
          },
          [],
        );
      }

      dispatch(addressApiCallSuccess());

      if (onSuccess) {
        dispatch({ type: onSuccess, payload });
      }
    }
  } catch (e) {
    console.error('Address middleware error:');
    console.error(e);
    dispatch(addressApiCallFailed());
  }
};

export default addressApi;

const getAddresses = (
  response: LoqateApiResponse,
  payload: ApiCallBeganPayload,
): Promise<any[]> => {
  const items = response.Items as LoqateFindApiData[];
  const { url, method, params, baseParams, baseURL } = payload;

  const promises = items.map(async item => {
    if (item.Type === 'Address') {
      return Promise.resolve(item.Text);
    } else {
      const response = await axios.request<LoqateApiResponse>({
        method,
        baseURL,
        url,
        params: {
          ...baseParams,
          ...params,
          Container: item.Id,
        },
      });
      return getAddresses(response.data, payload);
    }
  });
  return Promise.all(promises);
};
