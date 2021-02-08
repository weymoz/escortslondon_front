import { configureStore } from "@reduxjs/toolkit";
import reducer, { RootState } from "./reducer";
import api from "./middleware/api";
import sms from "./middleware/sms";
import addressApi from "./middleware/addressApi";
import sendmailApi from "./middleware/sendmailApi";
import duoSendmailApi from "./middleware/duoSendmailApi";
import uploadApi from "./middleware/upload-api";
import reviews from "./middleware/reviews";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

let currentStore: ReturnType<typeof configureStore>;

export const initStore = (preloadedState?: RootState) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    preloadedState,
    reducer,
    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware()
        .concat(api)
        .concat(sms)
        .concat(reviews)
        .concat(addressApi)
        .concat(sendmailApi)
        .concat(duoSendmailApi)
        .concat(reviews)
        .concat(uploadApi)
        .concat(sagaMiddleware);
      return middlewares;
    },
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const initializeStore = (preloadedState?: RootState, route?: string) => {
  let _store = currentStore ?? initStore(preloadedState);

  if (
    preloadedState &&
    currentStore &&
    route !== "/" &&
    route !== "/duo-escorts"
  ) {
    _store = initStore({
      ...(currentStore.getState() as RootState),
      ...preloadedState,
    });
    currentStore = undefined;
  }

  if (typeof window === "undefined") {
    return _store;
  }

  currentStore = _store;

  return _store;
};
