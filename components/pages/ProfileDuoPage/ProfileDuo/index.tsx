import React, { ReactElement, useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import Title from "@simple/Title";
import ReadMore from "@simple/ReadMore";
import s from "./style.module.css";
import { prepareGalleryImages, prepareRates } from "@store/helpers";
import _ from "lodash";
import Rates from "@simple/Rates";
import Location from "@simple/Location";
import Preloader from "@simple/Preloader";
import Button from "@simple/Button";
import { setEscort1Name } from "@store/escortDate";
import { useDispatch } from "react-redux";
import {
  addDuoProfile,
  DuoProfileStateSlice,
  cleanDuoProfile,
  selectEscort1GalleryLength,
} from "@store/duoProfile";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import { image } from "faker";
import { GalleryItem } from "@typedefs/app";
import GalleryDuo from "@simple/GalleryDuo";
import {
  addDuoEscortData,
  cleanDuoEscortDateData,
  setSelectedDuoSlug,
  selectDuoEscortGallery,
} from "@store/duoEscortDate";
import { useRouter } from "next/router";

interface Props {}

const formatNote = (note: string): React.ReactNode | null => {
  let formattedNote: ReactElement;

  if (note.toLowerCase().includes("extra")) {
    const noteArr = note.split("extra");
    const term = noteArr[0];
    const price = noteArr[1];
    const element = <h1>Hello, world!</h1>;

    formattedNote = (
      <span className={s.note}>
        <span className={s.noteTerm}>{term}</span>
        <span className={s.notePrice}>+{price}</span>
      </span>
    );
  } else {
    formattedNote = <span className={s.note}>{note}</span>;
  }
  return formattedNote;
};

export default function ProfileDuo({}: Props): ReactElement | null {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  const [girl, setGirl] = useState("firstGirl");

  const { data } = useSelector<RootState>(
    (state) => state.duoProfile
  ) as DuoProfileStateSlice;

  if (!data) return <Preloader full />;
  const handleBookButtonClick = () => {};
  const secondGirlImagesIndex = selectEscort1GalleryLength(data) + 1;

  const {
    title,
    slug,
    escort_1,
    escort_2,
    about,
    rates: ratesData,
    services,
    location,
  } = data;

  const rates = prepareRates(ratesData);
  const images = selectDuoEscortGallery(data);

  const {
    title: title1,
    age: age1,
    nationality: nationality1,
    bodyType: bodyType1,
    orientation: orientation1,
    bust: bust1,
    height: height1,
    language: language1,
    notice: notice1,
  } = escort_1 || {};

  const {
    title: title2,
    age: age2,
    nationality: nationality2,
    bodyType: bodyType2,
    orientation: orientation2,
    bust: bust2,
    height: height2,
    language: language2,
    notice: notice2,
  } = escort_2 || {};

  const profileName = (
    <div className={s.topBoxText}>
      <Title size="h4" after={`${age1} & ${age2} years old`}>
        {title || ""}
      </Title>
    </div>
  );

  const profileBookBtn = (
    <div className={s.topBoxBtn}>
      <Button link={`/duo-make-a-date/${slug}`} size="sm">
        Book Now
      </Button>
    </div>
  );

  const aboutContainer = (
    <div className={s.profileInfoBox}>
      {about && (
        <>
          <Title size="h6">About</Title>
          <div className={s.aboutContent}>
            {/* <div className={s.aboutTitle}>{about}</div> */}
            <ReadMore
              text={about || ""}
              id="profile-about-title"
              lines={isDesktop ? "6" : "4"}
            />
            {/* {about} */}
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <section className={s.prifileWrapper}>
        <div className={s.profileContainerTop}>
          {(isTablet || isLaptop) && (
            <div className={s.topBox}>
              {profileName}
              {profileBookBtn}
            </div>
          )}
          {isMobile && <div className={s.topBox}>{profileName}</div>}
        </div>
        <div className={s.profileContainer}>
          <GalleryDuo
            images={images}
            galleryStartIndex={girl === "firstGirl" ? 0 : secondGirlImagesIndex}
          />
          <div className={s.rightSide}>
            {isDesktop && (
              <div className={s.topBox}>
                {profileName}
                {profileBookBtn}
              </div>
            )}
            {isMobile && (
              <div className={s.profileBookBtnMobile}>{profileBookBtn}</div>
            )}
            <div className={s.profileInfo}>
              <div className={s.profileInfoGrid}>
                <div className={s.profileInfoBox}>
                  <div className={s.profileButtons}>
                    <div className={s.radioButtons}>
                      <label className={s.radioButton} htmlFor={"firstGirl"}>
                        <input
                          type="radio"
                          id="firstGirl"
                          name="girl"
                          value="firstGirl"
                          checked={girl === "firstGirl"}
                          onChange={(e) => setGirl(e.target.value)}
                        />
                        <span className={s.radioMask}>
                          {title1}’s specifics
                        </span>
                      </label>
                      <label className={s.radioButton} htmlFor={"secondGirl"}>
                        <input
                          type="radio"
                          id="secondGirl"
                          name="girl"
                          value="secondGirl"
                          checked={girl === "secondGirl"}
                          onChange={(e) => setGirl(e.target.value)}
                        />
                        <span className={s.radioMask}>
                          {title2}’s specifics
                        </span>
                      </label>
                    </div>
                  </div>
                  <Title size="h6">Specifics</Title>
                  <ul className={s.profileInfoList}>
                    <li key={1}>
                      <span>Nationality:</span>
                      {girl === "firstGirl" ? nationality1 : nationality2}
                    </li>
                    <li key={2}>
                      <span>Orientation:</span>
                      {girl === "firstGirl" ? orientation1 : orientation2}
                    </li>
                    <li key={3}>
                      <span>Body type:</span>
                      {girl === "firstGirl" ? bodyType1 : bodyType2}
                    </li>
                    <li key={4}>
                      <span>Bust:</span>
                      {girl === "firstGirl" ? bust1 : bust2}
                    </li>
                    <li key={5}>
                      <span>Height:</span>
                      {girl === "firstGirl" ? height1 : height2}
                    </li>
                    <li key={6}>
                      <span>Language:</span>
                      {girl === "firstGirl" ? language1 : language2}
                    </li>
                  </ul>
                </div>
                <div className={s.profileInfoBox}>
                  {services && services.length > 0 && (
                    <>
                      <Title size="h6">Services</Title>
                      <ul className={s.profileInfoTags}>
                        {services?.map((service, i) => (
                          <li key={i}>{service}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {!services.length && !isMobile && (
                    <div className={s.profileInfoBox}>
                      <Title size="h6">Notice</Title>
                      <div className={s.noticeBox}>
                        {notice1 && notice1.length > 0 && (
                          <div className={s.noticeForDuo}>
                            <div className={s.noticeForDuoName}>
                              {girl === "firstGirl" ? title1 : title2} ONLY:
                            </div>
                            {(girl === "firstGirl"
                              ? notice1
                              : notice2
                            ).map((note, i) => formatNote(note))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {!!services.length && !isMobile && (
                <div className={s.profileInfoGrid}>
                  {(isDesktop || isLaptop) && (
                    <div className={`${s.profileInfoBox} ${s.aboutDesktop}`}>
                      {aboutContainer}
                    </div>
                  )}
                  {!isMobile && (
                    <div className={s.profileInfoBox}>
                      <Title size="h6">Notice</Title>
                      <div className={s.noticeBox}>
                        {notice1 && notice1.length > 0 && (
                          <div className={s.noticeForDuo}>
                            <div className={s.noticeForDuoName}>
                              {girl === "firstGirl" ? title1 : title2} ONLY:
                            </div>
                            {(girl === "firstGirl"
                              ? notice1
                              : notice2
                            ).map((note, i) => formatNote(note))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {(isMobile || isTablet) && (
          <div className={s.profileContainerBottom}>
            <div className={s.profileInfoGrid}>
              {isMobile && (
                <div className={s.profileInfoBox}>
                  <Title size="h6">Notice</Title>
                  <div className={s.noticeBox}>
                    {notice1 && notice1.length > 0 && (
                      <div className={s.noticeForDuo}>
                        <div className={s.noticeForDuoName}>
                          {girl === "firstGirl" ? title1 : title2} ONLY:
                        </div>
                        {(girl === "firstGirl" ? notice1 : notice2).map(
                          (note, i) => (
                            <span className={s.note} key={i}>{`${note.replace(
                              new RegExp("extra", "i"),
                              " +"
                            )}`}</span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {aboutContainer}
            </div>
          </div>
        )}
      </section>
      <section className={s.sectionRateLocation}>
        <div className={`${s.container} ${s.rateLocationWrapper}`}>
          <Rates title="Duo Rates" data={rates} rates={rates} />
          <Location
            lat={location?.lat}
            lng={location?.lng}
            name={location?.name}
          />
        </div>
      </section>
    </>
  );
}
