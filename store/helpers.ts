import { LocationData } from "./escorts";
import { DEFAULT_LOCATION } from "./config";
import { GalleryData } from "@components/pages/ProfilePage";
export const findTag = (tags: string[], tag: string): boolean =>
  tags.map((t) => t.toLowerCase()).includes(tag);
export const formatLocationName = (name: string): string =>
  name.replace(", London", "").replace(", UK", "");
export const formatLocation = (location: LocationData): LocationData => {
  let fl: LocationData;
  if (!location) {
    fl = { ...DEFAULT_LOCATION };
  } else {
    fl = { ...location };
    fl.name = formatLocationName(fl.name);
  }
  return fl;
};

export const prepareGalleryImages = (
  imgMain: string,
  imgGall: string[]
): GalleryData[] => {
  const images = [imgMain, ...imgGall];
  return images.map((img) => ({
    original: img,
    thumbnail: img,
  }));
};

export const prepareRates = (rates: RatesData) => {
  return {
    GBP: [
      {
        time: "One hour",
        incall: "£" + rates?.gbp["1_One hour"].incall,
        outcall: "£" + rates?.gbp["1_One hour"].outcall,
        icon: "/images/one-hour.svg",
      },
      {
        time: "90 minutes",
        incall: "£" + rates?.gbp["2_90 minutes"].incall,
        outcall: "£" + rates?.gbp["2_90 minutes"].outcall,
        icon: "/images/90-minutes.svg",
      },
      {
        time: "Two hours",
        incall: "£" + rates?.gbp["3_Two hours"].incall,
        outcall: "£" + rates?.gbp["3_Two hours"].outcall,
        icon: "/images/two-hours.svg",
      },
      {
        time: "Three hours",
        incall: "£" + rates?.gbp["4_Three hours"].incall,
        outcall: "£" + rates?.gbp["4_Three hours"].outcall,
        icon: "/images/three-hours.svg",
      },
      {
        time: "Additional hour",
        incall: "£" + rates?.gbp["5_Additional hour"].incall,
        outcall: "£" + rates?.gbp["5_Additional hour"].outcall,
        icon: "/images/additional-hour.svg",
      },
      {
        time: "Overnight",
        incall: "£" + rates?.gbp["6_Overnight"].incall,
        outcall: "£" + rates?.gbp["6_Overnight"].outcall,
        icon: "/images/overnight.svg",
      },
    ],

    USD: [
      {
        time: "One hour",
        incall: "$" + rates?.usd["1_One hour"].incall,
        outcall: "$" + rates?.usd["1_One hour"].outcall,
        icon: "/images/one-hour.svg",
      },
      {
        time: "90 minutes",
        incall: "$" + rates?.usd["2_90 minutes"].incall,
        outcall: "$" + rates?.usd["2_90 minutes"].outcall,
        icon: "/images/90-minutes.svg",
      },
      {
        time: "Two hours",
        incall: "$" + rates?.usd["3_Two hours"].incall,
        outcall: "$" + rates?.usd["3_Two hours"].outcall,
        icon: "/images/two-hours.svg",
      },
      {
        time: "Three hours",
        incall: "$" + rates?.usd["4_Three hours"].incall,
        outcall: "$" + rates?.usd["4_Three hours"].outcall,
        icon: "/images/three-hours.svg",
      },
      {
        time: "Additional hour",
        incall: "$" + rates?.usd["5_Additional hour"].incall,
        outcall: "$" + rates?.usd["5_Additional hour"].outcall,
        icon: "/images/additional-hour.svg",
      },
      {
        time: "Overnight",
        incall: "$" + rates?.usd["6_Overnight"].incall,
        outcall: "$" + rates?.usd["6_Overnight"].outcall,
        icon: "/images/overnight.svg",
      },
    ],

    EUR: [
      {
        time: "One hour",
        incall: "€" + rates?.eur["1_One hour"].incall,
        outcall: "€" + rates?.eur["1_One hour"].outcall,
        icon: "/images/one-hour.svg",
      },
      {
        time: "90 minutes",
        incall: "€" + rates?.eur["2_90 minutes"].incall,
        outcall: "€" + rates?.eur["2_90 minutes"].outcall,
        icon: "/images/90-minutes.svg",
      },
      {
        time: "Two hours",
        incall: "€" + rates?.eur["3_Two hours"].incall,
        outcall: "€" + rates?.eur["3_Two hours"].outcall,
        icon: "/images/two-hours.svg",
      },
      {
        time: "Three hours",
        incall: "€" + rates?.eur["4_Three hours"].incall,
        outcall: "€" + rates?.eur["4_Three hours"].outcall,
        icon: "/images/three-hours.svg",
      },
      {
        time: "Additional hour",
        incall: "€" + rates?.eur["5_Additional hour"].incall,
        outcall: "€" + rates?.eur["5_Additional hour"].outcall,
        icon: "/images/additional-hour.svg",
      },
      {
        time: "Overnight",
        incall: "€" + rates?.eur["6_Overnight"].incall,
        outcall: "€" + rates?.eur["6_Overnight"].outcall,
        icon: "/images/overnight.svg",
      },
    ],
  };
};

export const nameChecker = /\D{2,}/;
export const emailChecker = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const phoneChecker = /\d{5,}/;
