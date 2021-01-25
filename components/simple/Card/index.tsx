import React, { ReactElement } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import Location from "@svg/location.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import s from "./style.module.css";
import { CardLinkType } from "@typedefs/app";

const CardWrapper = ({
  linkType,
  href,
  children,
}: {
  linkType: CardLinkType;
  href: string;
  children: ReactElement;
}): ReactElement => {
  switch (linkType) {
    case "router":
      return <Link href={href}>{children}</Link>;
    case "html":
      return <a href={href}>{children}</a>;
    default:
      return null;
  }
};

interface Props {
  id: string;
  title?: string;
  linkType?: CardLinkType;
  imageId?: string;
  imageUrl?: string;
  incallPrice?: string;
  outcallPrice?: string;
  location?: string;
  newTag?: boolean;
  recommendedTag?: boolean;
  onClick: () => void;
}

const Card = ({
  id,
  imageUrl,
  title,
  linkType = "router",
  location,
  incallPrice,
  outcallPrice,
  newTag,
  recommendedTag,
  onClick,
}: Props): ReactElement => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <CardWrapper linkType={linkType} href={`/profile/${title?.toLowerCase()}`}>
      <a className={s.cardContainer} onClick={onClick}>
        <div className={s.imageContainer}>
          {/*}
          <LazyLoadImage
            alt={title}
            height={400}
            src={`${imageUrl}?h=400`}
            width={270}
          />
          {*/}
          <img className={s.image} src={`${imageUrl}?h=400`} alt={title} />
          <div className={s.labels}>
            {newTag ? (
              <span className={`${s.label} ${s.new}`}> New </span>
            ) : null}
            {recommendedTag ? (
              <span className={`${s.label} ${s.recommended}`}>
                {" "}
                Recommended{" "}
              </span>
            ) : null}
          </div>
        </div>
        <div className={s.details}>
          <div className={s.name}>{title}</div>
          <div className={`${s.location}`}>
            <Location />
            {location}
          </div>
          <div className={s.prices}>
            {showPrice(incallPrice) && (
              <div className={s.price}>
                <span className={s.priceText}>
                  {isMobile ? "In:" : "Incall:"}
                </span>
                <span className={s.priceValue}>£{incallPrice}</span>
              </div>
            )}
            {showPrice(outcallPrice) && (
              <div className={s.price}>
                <span className={s.priceText}>
                  {isMobile ? "Out:" : "Outcall:"}
                </span>
                <span className={s.priceValue}>£{outcallPrice}</span>
              </div>
            )}
          </div>
        </div>
      </a>
    </CardWrapper>
  );
};
export default Card;

function showPrice(price: string | undefined = "0"): boolean {
  if (price === "0") return false;
  if (/\s+/.test(price)) return false;
  if (isNaN(parseInt(price))) return false;
  return true;
}
