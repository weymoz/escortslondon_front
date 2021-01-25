import React, { FC } from "react";
import Title from "@simple/Title";
import Button from "@simple/Button";
import Phone from "@svg/phone.svg";
import Messenger from "@svg/messenger.svg";
import s from "./style.module.css";
import { getPhoneUrl, getWhatsAppUrl } from "@functions/helpers";

interface Props {
  bgColor?: string;
  phone: string;
  whatsApp: string;
  callToActionTitle: string;
  callToActionText: string;
  callToActionButtonWrapperTitle: string;
  callToActionButtonWrapperText: string;
}

const GirlsWaiting: FC<Props> = ({
  bgColor,
  phone,
  whatsApp,
  callToActionButtonWrapperText,
  callToActionTitle,
  callToActionButtonWrapperTitle,
  callToActionText,
}) => {
  return (
    <section
      className={`
        ${s.girlsWaiting}
        ${bgColor === "black" ? s.girlsWaitingBlack : ""}
      `}
    >
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.contentTitle}>
            <Title size="h4">
              {callToActionTitle || "Girls are waiting for you!"}
            </Title>
            <p>
              {callToActionText ||
                "Call Escorts London today to meet the hottest local babes"}
            </p>
          </div>
          <div className={s.contactWrapper}>
            <a
              className={s.contactPhone}
              href={getPhoneUrl(phone) || "079 079 00666"}
            >
              <Phone />
              <span>{phone || "079 079 00666"}</span>
            </a>
            <a className={s.contactPhone} href={getWhatsAppUrl(whatsApp)}>
              <Messenger />
              <span>{whatsApp || "(+44) 079 079 00666"}</span>
            </a>
          </div>
        </div>
        <div className={s.makeDateWrapper}>
          <div className={s.makeDateTitle}>
            <Title size="h4">
              {callToActionButtonWrapperTitle || "Day & Night"}
            </Title>
            <p>
              {callToActionButtonWrapperText ||
                "We are open from 10am - 2am for incalls and outcalls"}
            </p>
          </div>
          <div className={s.btnWrapper}>
            <Button link={`/make-a-date`} size="sm" theme="light">
              Make a Date
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GirlsWaiting;
