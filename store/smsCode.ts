import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { smsApiCallBegan } from "./api";
import { RootState } from "./reducer";

interface SmsCodeStateSlice {
  code: string | null;
}

const smsCode = createSlice({
  name: "smsCode",
  initialState: {
    code: "",
  } as SmsCodeStateSlice,
  reducers: {
    smsCodeReceived: (smsCode, action: PayloadAction<string>) => {
      smsCode.code = action.payload;
      console.log("SMS code " + action.payload);
    },
    smsCodeRequested: () => {},
    smsCodeError: () => {},
  },
});

export default smsCode.reducer;

// Actions
export const sendSms = (phone: string) =>
  smsApiCallBegan({
    method: "get",
    url: "/sms",
    params: {
      phone,
    },
    onStart: smsCode.actions.smsCodeRequested.type,
    onSuccess: smsCode.actions.smsCodeReceived.type,
    onError: smsCode.actions.smsCodeError.type,
  });

// Selectors
export const selectSmsCode = (state: RootState) => state.smsCode.code;
