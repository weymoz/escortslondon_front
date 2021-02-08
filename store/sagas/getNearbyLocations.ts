import { filterApiCallBegan } from "@store/api";
import { escortsFilteredReceived } from "@store/escorts";
import { take } from "redux-saga/effects";

export default function* getNearbyLocations() {
  while (true) {
    const action: ReturnType<typeof filterApiCallBegan> = yield take(
      filterApiCallBegan.type
    );

    const location = action.payload?.params?.location as string[];

    if (location && location.length && location.length > 0) {
      yield take(escortsFilteredReceived.type);
      console.log("Filtered escorts received");
    }
  }
}
