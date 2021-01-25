import React, { useState, useRef, useEffect, memo } from "react";
import ImageGallery from "react-image-gallery";
import { useMediaQuery } from "react-responsive";
import ArrowRight from "@svg/arrow-right.svg";
import ArrowLeft from "@svg/arrow-left.svg";
import ArrowFullRight from "@svg/gallery-arrow-right.svg";
import ArrowFullLeft from "@svg/gallery-arrow-left.svg";
import Close from "@svg/close-burger.svg";

import s from "./style.module.css";
import { GalleryData } from "@components/pages/ProfilePage";
import Preloader from "../Preloader";
import { addWatermark } from "@functions/helpers";

const options = {
  init: function (img) {
    img.crossOrigin = "anonymous";
  },
};

interface Props {
  images: GalleryData[];
  preview?: boolean;
}

const Gallery = ({ images, preview }: Props) => {
  const [isFullScreen, setFullScreen] = useState(false);
  const [wmImages, setWmImages] = useState([]);
  const [firstImageReady, setFirstImageReady] = useState(false);

  useEffect(() => {
    //if (typeof window === "undefined" || preview) return;
    addWatermark(images[0].original)
      .then((data) => {
        setWmImages([{ original: data, thumbnail: data }]);
        setFirstImageReady(true);
      })
      .then(() => {
        images.splice(1).forEach((image, i) => {
          addWatermark(image.original).then((data) => {
            setWmImages((wmImages) =>
              [...wmImages, { original: data, thumbnail: data }].sort(
                (a, b) => {
                  a.original;
                }
              )
            );
          });
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [images[0]]);
  let imageGalleryRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const onScreenChange = (fullScreenElement) => {
    setFullScreen(!!fullScreenElement);
  };

  const renderLeftNav = (onClick, disabled) => {
    return (
      <button
        type="button"
        className={`${s.nav} ${s.leftNav}`}
        disabled={disabled}
        onClick={onClick}
      >
        {isFullScreen ? <ArrowFullLeft /> : <ArrowLeft />}
      </button>
    );
  };

  const renderRightNav = (onClick, disabled) => {
    return (
      <button
        type="button"
        className={`${s.nav} ${s.rightNav}`}
        disabled={disabled}
        onClick={onClick}
      >
        {isFullScreen ? <ArrowFullRight /> : <ArrowRight />}
      </button>
    );
  };

  const renderFullscreenButton = (onClick, isFullscreen) => {
    return (
      isFullscreen && (
        <button className={s.fullScreenClose} onClick={onClick}>
          <Close />
        </button>
      )
    );
  };

  const onImageClick = () => {
    imageGalleryRef.fullScreen();
  };

  const showThumbnails = isFullScreen || !isMobile;

  if (!firstImageReady) return <Preloader />;

  //filter empty data
  const filterdedImages = wmImages.filter((imageData) => !!imageData.original);

  if (filterdedImages.length === 0) return <Preloader />;
  return (
    <>
      <ImageGallery
        ref={(i) => (imageGalleryRef = i)}
        onClick={onImageClick.bind(this)}
        onScreenChange={onScreenChange.bind(this)}
        items={filterdedImages}
        showPlayButton={false}
        lazyLoad={true}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        renderFullscreenButton={renderFullscreenButton}
        showThumbnails={showThumbnails}
        useBrowserFullscreen={false}
        originalClass={"original-image"}
        additionalClass={s.gallery}
      />
    </>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.images[0].original === nextProps.images[0].original;
};

export default memo(Gallery, areEqual);
