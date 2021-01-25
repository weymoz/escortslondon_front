import React, { useState, useRef, useEffect } from "react";
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

export interface GalleryDuoData {
  original: string;
  thumbnail: string;
  id?: number;
}

interface Props {
  images: GalleryDuoData[];
  galleryStartIndex?: number;
}

const GalleryDuo = ({ images, galleryStartIndex }: Props) => {
  const [isFullScreen, setFullScreen] = useState(false);
  const [wmImages, setWmImages] = useState<GalleryDuoData[]>(images);
  const [firstImageReady, setFirstImageReady] = useState(false);

  useEffect(() => {
    addWatermark(images[0].original)
      .then((data) => {
        setWmImages([{ id: 0, original: data, thumbnail: data }]);
        setFirstImageReady(true);
      })
      .then(() => {
        images.splice(1).forEach((image, i) => {
          addWatermark(image.original).then((data) => {
            setWmImages((wmImages) =>
              [
                ...wmImages,
                { id: i + 1, original: data, thumbnail: data },
              ].sort((a, b): number => {
                return (a.id || 0) - (b.id || 0);
              })
            );
          });
        });
      });
  }, [images]);

  let imageGalleryRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const onScreenChange = (fullScreenElement) => {
    setFullScreen(!!fullScreenElement);
  };

  const renderLeftNav = (onClick, disabled) => {
    return (
      <button
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
        startIndex={galleryStartIndex}
        useBrowserFullscreen={false}
        additionalClass={s.gallery}
      />
    </>
  );
};

export default GalleryDuo;
