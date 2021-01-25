import { values } from "lodash";
import { EscortDateDuration, EscortDateType } from "./../store/escorts";
import {
  DurationSelectOption,
  Step3InputFieldName,
} from "./../store/escortDate";
import { RatesData, Escort } from "@store/escorts";
import { AssetFields, ContentfulItem } from "@typedefs/app";
import ImageEditor from "./ImageEditor";

export const shuffle = (array: any[]) => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const getInitialPrice = (rates: RatesData | undefined): number => {
  const strRate: string | number = (
    rates?.gbp?.["1_One hour"]?.incall ||
    rates?.gbp?.["1_One hour"]?.outcall ||
    "0"
  )?.toString();

  const numRate = parseInt(strRate);

  return numRate || 0;
};

export const isOutcallAvailable = (rates: RatesData) =>
  !!rates?.gbp?.["1_One hour"]?.outcall;

export const getPrice = (
  rates: RatesData | undefined,
  duration: EscortDateDuration,
  dateType: EscortDateType
): number => {
  if (!rates) {
    return 0;
  }
  const selectedPrice = rates.gbp[duration][dateType];
  let numPrice = parseInt(selectedPrice?.toString() || "0");
  return numPrice || 0;
};

export const fieldValueAdapter = (
  e: React.SyntheticEvent<HTMLInputElement>
): string => {
  return e.currentTarget.value;
};

export const fieldIsValid = (name: string, value: string) => {
  let rule: RegExp | null = null;

  switch (name as Step3InputFieldName) {
    case "name":
      rule = /..+/;
      break;
    case "email":
      rule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;
    case "phone":
      rule = /\d{7,11}/;
      break;
    case "comment":
      rule = /.*/;
      break;
    default:
      return;
  }

  const valid = rule.test(value);

  return valid;
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

export function randomId(): string {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

export const getPhoneUrl = (phone: string): string =>
  `tel:+${phone.replace(/ /g, "")}`;

export const getWhatsAppUrl = (whatsApp: string): string =>
  `https://wa.me/${whatsApp
    .replace("(", "")
    .replace(")", "")
    .replace("+", "")
    .replace(/ /g, "")}`;

export const addWatermark = (inputImageUrl: string) => {
  return new Promise((resolve: (d: any) => void, reject: (e: any) => void) => {
    const tempImage = new Image();
    tempImage.crossOrigin = "anonymous";
    tempImage.onload = () => {
      // Get input image dimensions
      const inputWidth = tempImage.width;
      const inputHeight = tempImage.height;

      //Create canvas with input image dimensions
      const cnv = document.createElement("canvas");
      cnv.width = inputWidth;
      cnv.height = inputHeight;
      const ctx = cnv.getContext("2d");

      //Draw input image on this canvas
      ctx?.drawImage(tempImage, 0, 0, inputWidth, inputHeight);

      const logoImage = new Image();
      logoImage.onerror = (e) => {
        reject(e);
      };

      logoImage.onload = () => {
        let logoWidth: number, logoHeight: number, posX: number, posY: number;
        if (inputWidth < inputHeight) {
          logoWidth = logoImage.width;
          logoHeight = inputHeight;
          posX = 0;
          posY = 0;
        } else {
          logoWidth = inputWidth;
          logoHeight = logoImage.height;
          posX = 0;
          posY = inputHeight - logoHeight;
        }
        ctx?.drawImage(logoImage, posX, posY, logoWidth, logoHeight);
        const dataUrl = cnv.toDataURL();
        resolve(dataUrl);
      };

      if (inputWidth < inputHeight) {
        logoImage.src = "/vertical.png";
      } else {
        logoImage.src = "/horizontal.png";
      }
    };
    tempImage.src = inputImageUrl;
  });
};
