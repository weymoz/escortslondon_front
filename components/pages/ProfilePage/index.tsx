import React, { FC } from "react";
import Link from "next/link";
import _ from "lodash";
import RecommendedContainer from "@containers/RecommendedContainer";
import GirlsWaiting from "@sections/GirlsWaiting";
import ArrowLeft from "@svg/arrow-left.svg";
import s from "./style.module.css";
import ProfileContainer from "@containers/ProfileContainer";
import ProfileNavContainer from "@containers/ProfileNavContainer";
import { MainPageSettings, ProfilePageSettings } from "@typedefs/app";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import { selectProfilePageSettings } from "@store/profilePageSettings";
import { selectMainPageSettings } from "@store/mainPageSettings";

export interface GalleryData {
  original: string;
  thumbnail: string;
}

const ProfilePage: FC = () => {
  const profilePageSettings = useSelector<RootState, ProfilePageSettings>(
    selectProfilePageSettings
  );

  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );

  const {
    callToActionText,
    callToActionTitle,
    callToActionButtonWrapperTitle,
    callToActionButtonWrapperText,
    recommendedLine1,
    recommendedLine2,
  } = profilePageSettings;

  const { phone, whatsApp } = mainPageSettings;

  return (
    <>
      <section className={s.nav}>
        <div className={s.container}>
          <div className={s.topNav}>
            <div className={s.topNavSide}>
              <Link prefetch={false} href="/">
                <a className={`${s.navLink} ${s.left}`}>
                  <ArrowLeft />
                  Back to gallery
                </a>
              </Link>
            </div>
            <div className={`${s.topNavSide} ${s.alignRight}`}>
              <ProfileNavContainer profileType="escort" contentType="escorts" />
            </div>
          </div>
        </div>
      </section>
      <ProfileContainer />
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
