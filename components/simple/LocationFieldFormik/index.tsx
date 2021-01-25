import React, { ReactElement, useEffect } from "react";
import LocationField from "@simple/LocationField";
import useSetFormikState from "@functions/hooks/useSetFormikState";
import { ReactSelectOption, GoogleMapsResponse, Location } from "@typedefs/app";
import axios from "@store/client";
import { LocationFieldValue } from "@pages/Casting/FieldValue";
import { useField } from "formik";

const baseURL = "https://maps.googleapis.com/maps/api/geocode/json";

interface Props {
  name: string;
}
export default function LocationFieldFormik({ name }: Props) {
  const [{ value: location }, _, { setValue }] = useField<Location>({ name });
  //const setLocationFieldValue = useSetFormikState<Location>(name);
  const handleChange = async (option: ReactSelectOption<string>) => {
    const address = option.value;
    const coordinates = await sendGeocodingRequest(address);
    //setLocationFieldValue(new LocationFieldValue(coordinates.data, address));

    setValue({
      lat: coordinates.data?.results[0]?.geometry?.location?.lat,
      lng: coordinates.data?.results[0]?.geometry?.location?.lng,
      name: address,
      address: coordinates.data?.results[0]?.formatted_address,
    });
  };

  return <LocationField location={location} onChange={handleChange} />;
}

async function sendGeocodingRequest(address: string) {
  return await axios.request<GoogleMapsResponse>({
    method: "get",
    baseURL,
    params: {
      address,
      key: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY,
      region: "uk",
    },
  });
}
