import React, { ReactElement, FC } from "react";
import Link from "next/link";
import _ from "lodash";
import RecommendedContainer from "@containers/RecommendedContainer";
import GirlsWaiting from "@sections/GirlsWaiting";
import ArrowLeft from "@svg/arrow-left.svg";
import s from "./style.module.css";
import ProfileDuo from "./ProfileDuo";
import ProfileNavContainer from "@containers/ProfileNavContainer";
import { DuoProfilePageSettings, MainPageSettings } from "@typedefs/app";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import { selectMainPageSettings } from "@store/mainPageSettings";
import { selectDuoProfilePageSettings } from "@store/duoProfilePageSettings";

export interface GalleryData {
  original: string;
  thumbnail: string;
}

const ProfilePage: FC = () => {
  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );

  const duoProfilePageSettings = useSelector<RootState, DuoProfilePageSettings>(
    selectDuoProfilePageSettings
  );

  const {
    callToActionText,
    callToActionTitle,
    callToActionButtonWrapperTitle,
    callToActionButtonWrapperText,
    recommendedLine1,
    recommendedLine2,
  } = duoProfilePageSettings;

  const { phone, whatsApp } = mainPageSettings;
  return (
    <>
      <section className={s.nav}>
        <div className={s.container}>
          <div className={s.topNav}>
            <div className={s.topNavSide}>
              <Link prefetch={false} href="/duo-girls">
                <a className={`${s.navLink} ${s.left}`}>
                  <ArrowLeft />
                  Back to gallery
                </a>
              </Link>
            </div>
            <div className={`${s.topNavSide} ${s.alignRight}`}>
              <ProfileNavContainer
                profileType="duo escort"
                contentType="escortsDuo"
              />
            </div>
          </div>
        </div>
      </section>
      <ProfileDuo />
      <GirlsWaiting
        bgColor="black"
        phone={phone}
        whatsApp={whatsApp}
        callToActionText={callToActionText}
        callToActionTitle={callToActionTitle}
        callToActionButtonWrapperTitle={callToActionButtonWrapperTitle}
        callToActionButtonWrapperText={callToActionButtonWrapperText}
      />
      <RecommendedContainer
        cardLinkType="html"
        title={recommendedLine1}
        subTitle={recommendedLine2}
      />
    </>
  );
};

export default ProfilePage;
