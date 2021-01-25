import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import {
  EscortsDuo,
  EscortsDuoResponse,
  Escort,
  ReactSelectOption,
  RatePerTime,
} from "@typedefs/app";
import EscortsDuoModel from "@models/EscortsDuoModel";
import { apiCallBegan, filterApiCallBegan } from "./api";
import { GalleryDuoData } from "@components/simple/GalleryDuo";
import { FilterApiEscortsDuoResponse } from "@typedefs/app";
import moment, { Moment } from "moment";
import { RootState } from "./reducer";
import { nameChecker, emailChecker, phoneChecker } from "./helpers";
import { FormErrors } from "./middleware/sendSmsApi";

export interface DuoEscortDateStateSlice {
  data: EscortsDuo | null;
  selectedDuoSlug: string;
  escortsDuoByName: ReactSelectOption<string>[];
  date: string;
  time: string;
  duration: ReactSelectOption<string>;
  price: number;
  name: string;
  nameError: boolean;
  email: string;
  emailError: boolean;
  phone: string;
  phoneError: boolean;
  comment: string;
  showModal: boolean;
}

const initDuration = { label: "One hour", value: "1_One hour" };

const initialState: DuoEscortDateStateSlice = {
  data: null,
  selectedDuoSlug: "",
  escortsDuoByName: [],
  date: moment().format(),
  time: moment().format(),
  duration: initDuration,
  price: 0,
  name: "",
  nameError: false,
  email: "",
  emailError: false,
  phone: "",
  phoneError: false,
  comment: "",
  showModal: false,
};

const duoEscortDate = createSlice({
  name: "duoEscortDate",
  initialState,
  reducers: {
    dataRequested: () => {},
    dataRequestError: () => {},
    dataReceived: (state, action: PayloadAction<EscortsDuoResponse>) => {
      // set new duo escorts data
      state.data = new EscortsDuoModel(
        action.payload.items[0],
        action.payload.includes
      ).getSerializable();

      // set new minimal price
      state.price = parseInt(state.data.rates?.gbp["1_One hour"].incall || "0");
    },

    cleanDuoEscortDateData: (state) => {
      state.data = null;
      state.selectedDuoSlug = "";
      state.escortsDuoByName = [];
      state.date = moment().format();
      state.time = moment().format();
      state.duration = initDuration;
      state.price = 0;
      state.name = "";
      state.nameError = false;
      state.email = "";
      state.emailError = false;
      state.phone = "";
      state.phoneError = false;
      state.comment = "";
      state.showModal = false;
    },

    allEscortsDuoRequested: () => {},
    allEscortsDuoRequestError: () => {},
    ellEscortsDuoReceived: (
      state,
      action: PayloadAction<FilterApiEscortsDuoResponse[]>
    ) => {
      state.escortsDuoByName = action.payload.map((item) => ({
        value: item.slug,
        label: item.title,
      }));
    },
    setSelectedDuoSlug: (state, action: PayloadAction<string>) => {
      state.selectedDuoSlug = action.payload;
    },

    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },

    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },

    setDuration: (state, action: PayloadAction<ReactSelectOption<string>>) => {
      state.duration = action.payload;

      state.price = parseInt(
        state.data?.rates?.gbp[action.payload.value as keyof RatePerTime]
          .incall || "0"
      );
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    checkName: (state, action: PayloadAction<boolean | undefined>) => {
      state.nameError = action.payload ? false : !nameChecker.test(state.name);
    },

    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    checkEmail: (state) => {
      state.emailError = !emailChecker.test(state.email);
    },

    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },

    checkPhone: (state) => {
      state.phoneError = !phoneChecker.test(state.phone);
    },

    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },

    setFormErrors: (state, action: PayloadAction<FormErrors>) => {
      const { nameError, emailError, phoneError } = action.payload;
      state.nameError = nameError;
      state.phoneError = phoneError;
      state.emailError = emailError;
    },

    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
});

export default duoEscortDate.reducer;

// Actions

export const setDate = duoEscortDate.actions.setDate;
export const setTime = duoEscortDate.actions.setTime;
export const setDuration = duoEscortDate.actions.setDuration;
export const setName = duoEscortDate.actions.setName;
export const checkName = duoEscortDate.actions.checkName;
export const setEmail = duoEscortDate.actions.setEmail;
export const checkEmail = duoEscortDate.actions.checkEmail;
export const setPhone = duoEscortDate.actions.setPhone;
export const checkPhone = duoEscortDate.actions.checkPhone;
export const setFormErrors = duoEscortDate.actions.setFormErrors;
export const setComment = duoEscortDate.actions.setComment;
export const setShowModal = duoEscortDate.actions.setShowModal;
export const cleanDuoEscortDateData =
  duoEscortDate.actions.cleanDuoEscortDateData;
export const setSelectedDuoSlug = duoEscortDate.actions.setSelectedDuoSlug;

export const addInitialDuoEscortData = () =>
  apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      content_type: "escortsDuo",
      limit: 1,
    },
    onStart: duoEscortDate.actions.dataRequested.type,
    onError: duoEscortDate.actions.dataRequestError.type,
    onSuccess: duoEscortDate.actions.dataReceived.type,
  });

export const addDuoEscortData = (slug: string) =>
  apiCallBegan({
    url: "/entries",
    method: "get",
    params: {
      content_type: "escortsDuo",
      limit: 1,
      "fields.slug": slug,
    },
    onStart: duoEscortDate.actions.dataRequested.type,
    onError: duoEscortDate.actions.dataRequestError.type,
    onSuccess: duoEscortDate.actions.dataReceived.type,
  });

export const duoEscortDateDataReceived = duoEscortDate.actions.dataReceived;

export const addAllDuoEscorts = () =>
  filterApiCallBegan({
    method: "get",
    url: "/all-duo-escorts",
    onSuccess: duoEscortDate.actions.ellEscortsDuoReceived.type,
    onError: duoEscortDate.actions.allEscortsDuoRequestError.type,
    onStart: duoEscortDate.actions.allEscortsDuoRequested.type,
  });

// Selectors
export const selectDuoEscortGallery = createSelector<
  EscortsDuo,
  Escort | null | undefined,
  Escort | null | undefined,
  GalleryDuoData[]
>(
  (data) => data.escort_1,
  (data) => data.escort_2,
  (escort1, escort2) => {
    if (!escort1 && !escort2) return [];
    if (
      !escort1?.gallery &&
      !escort2?.gallery &&
      !escort1?.thumbnail &&
      !escort2?.thumbnail
    )
      return [];

    const images: GalleryDuoData[] = [];
    if (escort1) {
      if (escort1.thumbnail)
        images.push({
          original: escort1.thumbnail,
          thumbnail: escort1.thumbnail,
        });
      if (escort1.gallery && escort1.gallery.length > 0)
        escort1.gallery.forEach((item) => {
          images.push({
            original: item,
            thumbnail: item,
          });
        });
    }
    if (escort2) {
      if (escort2.thumbnail)
        images.push({
          original: escort2.thumbnail,
          thumbnail: escort2.thumbnail,
        });
      if (escort2.gallery && escort2.gallery.length > 0)
        escort2.gallery.forEach((item) => {
          images.push({
            original: item,
            thumbnail: item,
          });
        });
    }
    return images;
  }
);

export const selectDuoEscortDateData = (state: RootState): EscortsDuo | null =>
  state.duoEscortDate.data;

export const selectDuoEscortDateDate = (state: RootState): Date => {
  return new Date(state.duoEscortDate.date);
};
export const selectDuoEscortDateTime = (state: RootState): Moment => {
  return moment(state.duoEscortDate.time);
};

export const selectDuoEscortDateDuration = (
  state: RootState
): ReactSelectOption<string> => {
  return state.duoEscortDate.duration;
};

export const selectDuoEscortDatePrice = (state: RootState): number => {
  return state.duoEscortDate.price;
};

export const selectDuoEscortDateTitle = (state: RootState): string => {
  return state.duoEscortDate.data?.title || "";
};

export const selectDuoEscortDateName = (state: RootState): string => {
  return state.duoEscortDate.name;
};
export const selectDuoEscortDateNameError = (state: RootState): boolean => {
  return state.duoEscortDate.nameError;
};
export const selectDuoEscortDateEmail = (state: RootState): string => {
  return state.duoEscortDate.email;
};
export const selectDuoEscortDateEmailError = (state: RootState): boolean => {
  return state.duoEscortDate.emailError;
};
export const selectDuoEscortDatePhone = (state: RootState): string => {
  return state.duoEscortDate.phone;
};
export const selectDuoEscortDatePhoneError = (state: RootState): boolean => {
  return state.duoEscortDate.phoneError;
};
export const selectDuoEscortDateComment = (state: RootState): string => {
  return state.duoEscortDate.comment;
};
export const selectDuoEscortDateShowModal = (state: RootState): boolean => {
  return state.duoEscortDate.showModal;
};
