import { Middleware } from "redux";
import { RootState } from "@store/reducer";
import { duoSendmailApiCallBegan } from "@store/api";
import axios from "@store/client";
import moment from "moment";

const duoSendmailApi: Middleware<{}, RootState> = ({ dispatch, getState }) => (
  next
) => async (action) => {
  if (action.type !== duoSendmailApiCallBegan.type) {
    return next(action);
  }

  const { url, baseParams, baseURL } = action.payload;

  const {
    duoEscortDate: {
      data,
      date: dateValue,
      time: timeValue,
      duration: durationOption,
      price: priceValue,
      name,
      email,
      phone: phoneValue,
      comment,
    },
  } = getState();

  const title = data?.title;
  const duration = durationOption?.label;
  const price = `£${priceValue}`;
  const phone = `+${phoneValue}`;
  const date = moment(dateValue).format("MMM DD YYYY");
  const time = moment(timeValue).format("h:mm a");

  await axios.post(
    url,
    {
      title,
      date,
      time,
      duration,
      price,
      name,
      email,
      phone,
      comment,
    },
    {
      params: baseParams,
      baseURL,
    }
  );
};

export default duoSendmailApi;
