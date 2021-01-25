import React, { ReactElement } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoBox,
  useJsApiLoader,
} from "@react-google-maps/api";

import Title from "@simple/Title";

import svgMarkerUrl from "@svg/marker.svg";

import s from "./style.module.css";
import { googleMapsApiCallBegan } from "@store/api";

declare const GOOGLEMAPS_API_KEY: string;

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface Props {
  lat?: number;
  lng?: number;
  name?: string;
}

const Location = ({ lat, lng, name }: Props): ReactElement => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY,
  });
  return (
    <div className={s.location}>
      <Title size="h6">Location</Title>
      <div className={s.mapWrapper}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat, lng }}
            zoom={15}
          >
            <Marker
              icon={{
                url: svgMarkerUrl,
                scaledSize: { width: 46, height: 46 },
                origin: { x: 0, y: 0 },
                anchor: { x: 23, y: 23 },
              }}
              position={{ lat, lng }}
            />
          </GoogleMap>
        ) : null}
        <div className={s.locationInfo}>{name}</div>
      </div>
    </div>
  );
};

export default Location;
