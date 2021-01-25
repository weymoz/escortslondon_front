import { combineReducers } from "@reduxjs/toolkit";
import entities from "./entities";
import allLocations from "./allLocations";
import allPrices from "./allPrices";
import filters from "./filters";
import allServices from "./allServices";
import escortDate from "./escortDate";
import smsCode from "./smsCode";
import settings from "./settings";
import duoEscorts from "./duoEscorts";
import duoProfile from "./duoProfile";
import duoEscortDate from "./duoEscortDate";
import service from "./service";
import casting from "./casting";
import reviews from "./reviews";
import profile from "./profile";
import servicesMenu from "./servicesMenu";
import mainPageSettings from "./mainPageSettings";
import escortsDuoPageSettings from "./escortsDuoPageSettings";
import profilePageSettings from "./profilePageSettings";
import duoProfilePageSettings from "./duoProfilePageSettings";
import castingPageSettings from "./castingPageSettings";
import faqPageSettings from "./faqPageSettings";
import termsPageSettings from "./termsPageSettings";

const rootReducer = combineReducers({
  entities,
  profile,
  allLocations,
  allPrices,
  filters,
  allServices,
  escortDate,
  smsCode,
  settings,
  duoEscorts,
  duoProfile,
  duoEscortDate,
  service,
  casting,
  reviews,
  servicesMenu,
  mainPageSettings,
  escortsDuoPageSettings,
  profilePageSettings,
  duoProfilePageSettings,
  castingPageSettings,
  faqPageSettings,
  termsPageSettings,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
