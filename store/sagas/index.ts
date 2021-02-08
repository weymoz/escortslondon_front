import { all } from "redux-saga/effects";
import getNearbyLocations from "./getNearbyLocations";

export default function* rootSaga() {
  yield all([getNearbyLocations()]);
}
