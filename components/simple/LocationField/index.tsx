import React, { ReactElement, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import s from "./style.module.css";
import svgMarkerUrl from "@svg/marker.svg";
import SelectPostcode from "../SelectPostcode";
import { ReactSelectOption, Location } from "@typedefs/app";

interface Props {
  onChange: (o: ReactSelectOption<string>) => void;
  location: Location;
}

export default function LocationField({ onChange, location }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY,
  });
  return (
    <div className={s.fieldWrapper}>
      <h2 className={s.fieldTitle}>Location</h2>
      <div className={s.mapWrapper}>
        <SelectPostcode className={s.selectPostcode} onChange={onChange} />
        {isLoaded ? (
          <GoogleMap
            center={location}
            zoom={16}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
            }}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
          >
            <Marker
              icon={{
                url: svgMarkerUrl,
                scaledSize: { width: 46, height: 46 },
                origin: { x: 0, y: 0 },
                anchor: { x: 23, y: 23 },
              }}
              position={location}
            />
          </GoogleMap>
        ) : null}
      </div>
    </div>
  );
}
