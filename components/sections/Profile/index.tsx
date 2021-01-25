import React, { ReactElement } from "react";
import { useMediaQuery } from "react-responsive";
import Title from "@simple/Title";
import ReadMore from "@simple/ReadMore";
import s from "./style.module.css";
import Gallery from "@simple/Gallery";
import { prepareGalleryImages, prepareRates } from "@store/helpers";
import _ from "lodash";
import { Escort } from "@store/escorts";
import Rates from "@simple/Rates";
import Location from "@simple/Location";
import Preloader from "@simple/Preloader";
import Button from "@simple/Button";
import cx from "classnames";
import CloseIcon from "@svg/close.svg";
import Reviews from "@sections/Reviews";
import Link from "next/link";

interface Props {
  data: Escort | null;
  loading: boolean;
  setEscort1Name: (title: string) => void;
  preview?: boolean;
  closeModal?: () => void | undefined;
}

const formatNote = (note: string): React.ReactNode => {
  let formattedNote: React.ReactNode;
  if (note.toLowerCase().includes("extra")) {
    const noteArr = note.split("extra");
    const term = noteArr[0];
    const price = noteArr[1];
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

export default function Profile({
  data,
  loading,
  setEscort1Name,
  preview,
  closeModal,
}: Props): ReactElement | null {
  if (!data) return <Preloader full />;

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  const handleBookButtonClick = () => {
    setEscort1Name(data.title || "");
  };

  const {
    id,
    title,
    age,
    hair,
    bust,
    notice,
    about,
    height,
    language,
    nationality,
    bodyType,
    services,
    orientation,
    imageId,
    imageUrl,
    additionalImageUrls,
    location,
    rates: ratesData,
  } = data;

  const images = prepareGalleryImages(imageUrl, additionalImageUrls);
  const rates = prepareRates(ratesData);
  const profileName = (
    <div className={s.topBoxText}>
      <Title size="h4" after={`${age} years old`}>
        {title || ""}
      </Title>
    </div>
  );

  const profileBookBtn = (
    <div className={s.topBoxBtn}>
      {/*}
      <Button onClick={handleBookButtonClick} size="sm">
        Book Now
      </Button>
      {*/}
      <Button link={`/make-a-date/${title}`} size="sm">
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
            <ReadMore
              text={about || ""}
              id="profile-about-title"
              lines={isDesktop ? "6" : "4"}
            />
          </div>
        </>
      )}
    </div>
  );
  return (
    <>
      <section
        className={cx(s.prifileWrapper, preview && s.previewProfileWrapper)}
      >
        <div className={s.profileContainerTop}>
          {(isTablet || isLaptop) && (
            <div className={s.topBox}>
              {profileName}
              {preview ? (
                <CloseIcon onClick={closeModal} className={s.closeIcon} />
              ) : (
                profileBookBtn
              )}
            </div>
          )}
          {isMobile && (
            <div className={s.topBox}>
              {profileName}
              <CloseIcon onClick={closeModal} className={s.closeIcon} />
            </div>
          )}
        </div>
        <div className={s.profileContainer}>
          <Gallery preview={preview} images={images} />
          <div className={s.rightSide}>
            {isDesktop && (
              <div className={s.topBox}>
                {profileName}
                {preview ? (
                  <CloseIcon onClick={closeModal} className={s.closeIcon} />
                ) : (
                  profileBookBtn
                )}
              </div>
            )}
            {isMobile && (
              <div className={s.profileBookBtnMobile}>
                {!preview && profileBookBtn}
              </div>
            )}
            <div className={s.profileInfo}>
              <div className={s.profileInfoGrid}>
                <div className={s.profileInfoBox}>
                  <Title size="h6">Specifics</Title>
                  <ul className={s.profileInfoList}>
                    <li key={1}>
                      <span>Nationality:</span>
                      {nationality}
                    </li>
                    <li key={2}>
                      <span>Orientation:</span>
                      {orientation}
                    </li>
                    <li key={3}>
                      <span>Body type:</span>
                      {bodyType}
                    </li>
                    <li key={4}>
                      <span>Bust:</span>
                      {bust}
                    </li>
                    <li key={5}>
                      <span>Height:</span>
                      {height}
                    </li>
                    <li key={6}>
                      <span>Language:</span>
                      {language}
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
                </div>
              </div>
              {!isMobile && (
                <div className={s.profileInfoGrid}>
                  {(isDesktop || isLaptop) && (
                    <div className={`${s.profileInfoBox} ${s.aboutDesktop}`}>
                      {aboutContainer}
                    </div>
                  )}
                  {!isMobile && (
                    <div className={s.profileInfoBox}>
                      {notice && notice.length > 0 && (
                        <>
                          <Title size="h6">Notice</Title>
                          <div className={s.noticeBox}>
                            {notice?.map((note, i) => formatNote(note))}
                          </div>
                        </>
                      )}
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
                  {notice && notice.length > 0 && (
                    <>
                      <Title size="h6">Notice</Title>
                      <div className={s.noticeBox}>
                        {notice?.map((note, i) => (
                          <span className={s.note} key={i}>{`${note.replace(
                            new RegExp("extra", "i"),
                            " +"
                          )}`}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              {about}
            </div>
          </div>
        )}
      </section>
      {!preview && <Reviews />}
      <section className={s.sectionRateLocation}>
        <div
          className={cx(
            s.container,
            s.rateLocationWrapper,
            preview && s.previewRateLocationWrapper
          )}
        >
          <Rates data={rates} rates={rates} ratesForm={preview} />
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
