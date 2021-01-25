import { getInitialPrice, getPrice } from "@functions/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Escort,
  EscortsData,
  EscortDateDuration,
  EscortDateType,
} from "./escorts";
import { apiCallBegan, addressApiCallBegan } from "./api";
import { getProfile } from "./profile";
import moment from "moment";
import { RootState } from "./reducer";

const getEscortName = (escortNumber: number): string =>
  `escort${escortNumber}` as keyof SliceState;

interface SliceState {
  escort1: EscortDataSliceState;
  escort2: EscortDataSliceState;
  ammount: EscortAmmount;
  datePrice: number;
  dateType: EscortDateType;
  date: string;
  time: string;
  duration: DurationSelectOption;
  postCode: string;
  postCodeError: boolean;
  addresses: string[];
  selectedAddress: string;
  selectedAddressError: boolean;
  step3: StepData<Step3Fields<string>, Step3Fields<boolean>>;
  requiredFieldsAreEmpty: boolean;
}

export type EscortAmmount = "solo" | "duo";

export interface StepData<V, E> {
  value: V;
  error: E;
}

export type StepDataType = keyof StepData<any, any>;

export interface Step3Fields<T> {
  name: T;
  email: T;
  phone: T;
  comment?: T;
}

export type Step3InputFieldName = keyof Step3Fields<any>;

export interface DurationSelectOption {
  value: EscortDateDuration;
  label: string;
}

type EscortDataSliceState = {
  data: Escort | null;
  loading: boolean;
  name: string;
};

const escortDate = createSlice({
  name: "escortDate",
  initialState: {
    escort1: {
      data: null,
      loading: false,
      name: "",
    },
    escort2: {
      data: null,
      loading: false,
      name: "",
    },
    ammount: "solo",
    datePrice: 0,
    dateType: "incall",
    date: new Date().toUTCString(),
    time: moment().toDate().toUTCString(),
    duration: { value: "1_One hour", label: "One hour" },
    postCode: "",
    postCodeError: false,
    addresses: [],
    selectedAddress: "",
    selectedAddressError: false,
    clientName: "",
    step3: {
      value: {
        name: "",
        email: "",
        phone: "",
        comment: "",
      },
      error: {
        name: false,
        email: false,
        phone: false,
      },
    },
    requiredFieldsAreEmpty: true,
  } as SliceState,
  reducers: {
    dataReceived: {
      reducer: (state, action: PayloadAction<EscortsData, string, number>) => {
        const escortName = getEscortName(action.meta || 1);
        const profileData = getProfile(action.payload);
        (state[
          escortName as keyof SliceState
        ] as EscortDataSliceState).data = profileData;

        (state[escortName as keyof SliceState] as EscortDataSliceState).name =
          action.payload.items[0]?.fields?.title;

        state.datePrice = getInitialPrice(profileData?.rates);
      },
      prepare: (payload: EscortsData, meta: number) => {
        return {
          payload,
          meta,
        };
      },
    },

    dataError: () => {},

    dataRequested: () => {},

    setEscort1Name: (state, action: PayloadAction<string>) => {
      state.escort1.name = action.payload;
    },

    cleanEscortData: (state, action: PayloadAction<number>) => {
      const escortName = getEscortName(action.payload);
      (state[
        escortName as keyof SliceState
      ] as EscortDataSliceState).data = null;
      (state[escortName as keyof SliceState] as EscortDataSliceState).name = "";
      state.addresses = [];
      state.ammount = "solo";
      state.date = new Date().toUTCString();
      state.datePrice = 0;
      state.dateType = "incall";
      state.duration = { label: "One hour", value: "1_One hour" };
      state.postCode = "";
      state.postCodeError = false;
      state.requiredFieldsAreEmpty = true;
      state.selectedAddress = "";
      state.selectedAddressError = false;
      state.time = moment().toDate().toUTCString();
      state.step3.value.name = "";
      state.step3.value.email = "";
      state.step3.value.phone = "";
      state.step3.value.comment = "";
      state.step3.error.name = false;
      state.step3.error.email = false;
      state.step3.error.phone = false;
      state.step3.error.comment = false;
    },

    setAmmount: (state, action: PayloadAction<EscortAmmount>) => {
      state.ammount = action.payload;
    },

    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },

    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },

    setDuration: (state, action: PayloadAction<DurationSelectOption>) => {
      state.duration = action.payload;
      const duration = action.payload.value;
      const dateType = state.dateType;
      const rates = state.escort1.data?.rates;
      state.datePrice = getPrice(rates, duration, dateType);
    },

    setDateType: (state, action: PayloadAction<EscortDateType>) => {
      state.dateType = action.payload;
      const duration = state.duration.value;
      const dateType = action.payload;
      const rates = state.escort1.data?.rates;
      state.datePrice = getPrice(rates, duration, dateType);
    },

    setPostCode: (state, action: PayloadAction<string>) => {
      state.postCode = action.payload;
      if (action.payload) state.postCodeError = false;
    },

    setPostCodeError: (state, action: PayloadAction<boolean>) => {
      state.postCodeError = action.payload;
    },

    setSelectedAddress: (state, action: PayloadAction<string>) => {
      state.selectedAddress = action.payload;
      if (action.payload) state.selectedAddressError = false;
    },

    setSelectedAddressError: (state, action: PayloadAction<boolean>) => {
      state.selectedAddressError = action.payload;
    },

    addressesReceived: (state, action: PayloadAction<string[]>) => {
      state.addresses = action.payload;
      state.selectedAddress = "";
    },
    addressesRequested: () => {},
    requestAddressesError: () => {},

    cleanAddresses: (state) => {
      state.addresses = [];
    },

    setInputField: (state, action: PayloadAction<InputFieldPayload>) => {
      const { type, name, value } = action.payload;
      state.step3[type][name] = value;

      const { name: clientName, email, phone } = state.step3.value;

      if (type === "error") {
        state.requiredFieldsAreEmpty = !(clientName && email && phone);
      }
    },
  },
});

export default escortDate.reducer;

export interface InputFieldPayload {
  type: StepDataType;
  name: Step3InputFieldName;
  value: string | boolean;
}

export const escortDateDataReceived = escortDate.actions.dataReceived;

export const setInputField = escortDate.actions.setInputField;

const addEscortDateData = (escortNumber: number, title: string) =>
  apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      ["fields.title"]: title[0].toUpperCase() + title.slice(1),
      content_type: "escorts",
    },
    meta: escortNumber,
    onSuccess: escortDate.actions.dataReceived.type,
    onError: escortDate.actions.dataError.type,
    onStart: escortDate.actions.dataRequested.type,
  });

export const addEscort1DateData = addEscortDateData.bind(null, 1);
export const addEscort2DateData = addEscortDateData.bind(null, 2);

export const addEscortDataInit = () =>
  apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      limit: 1,
      content_type: "escorts",
    },
    meta: 1,
    onSuccess: escortDate.actions.dataReceived.type,
    onError: escortDate.actions.dataError.type,
    onStart: escortDate.actions.dataRequested.type,
  });

export const setEscort1Name = escortDate.actions.setEscort1Name;

export const setDateType = escortDate.actions.setDateType;

export const setAmmount = escortDate.actions.setAmmount;

export const setDate = escortDate.actions.setDate;

export const setTime = escortDate.actions.setTime;

export const setDuration = escortDate.actions.setDuration;

export const setPostCode = escortDate.actions.setPostCode;

export const setPostCodeError = escortDate.actions.setPostCodeError;

export const setSelectedAddress = escortDate.actions.setSelectedAddress;

export const setSelectedAddressError =
  escortDate.actions.setSelectedAddressError;

export const cleanEscort1Data = escortDate.actions.cleanEscortData.bind(
  null,
  1
);
export const cleanEscort2Data = escortDate.actions.cleanEscortData.bind(
  null,
  2
);

export const addAddressesByPostcode = (postcode: string) =>
  addressApiCallBegan({
    url: "/Find/v1.10/json3.ws",
    method: "get",
    params: {
      Text: postcode,
      Countries: "GB",
      IsMiddleware: "True",
      Limit: 100,
    },
    onStart: escortDate.actions.addressesRequested.type,
    onError: escortDate.actions.requestAddressesError.type,
    onSuccess: escortDate.actions.addressesReceived.type,
  });

export const cleanAddresses = escortDate.actions.cleanAddresses;

//Selectors
export const selectAddresses = (state: RootState) => state.escortDate.addresses;
