import { combineReducers } from "@reduxjs/toolkit";
import escorts from "./escorts";
import profile from "./profile";
import recommended from "./recommended";
import profileNav from "./profileNav";
import byName from "./byName";

const entities = combineReducers({
  escorts,
  byName,
  profileNav,
  recommended,
});

export default entities;
