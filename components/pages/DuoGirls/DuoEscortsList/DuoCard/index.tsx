import React from "react";
import Link from "next/link";
import Location from "@svg/location.svg";

import s from "./style.module.css";
import { EscortsDuo } from "@typedefs/app";

interface Props {
  data: EscortsDuo;
}

const DuoCard = ({
  data: { title, slug, thumbnail, displayRate, displayLocation },
}: Props) => {
  return (
    <Link href={`/duo-escorts-profile/${slug}`}>
      <a key={title} className={s.duoCard}>
        <div className={s.imagesContainer}>
          {thumbnail.map((image, i) => (
            <img
              key={`${i}`}
              className={s.image}
              src={`${image}?h=300`}
              alt={title}
            />
          ))}
        </div>
        <div className={s.details}>
          <div className={s.name}>{title}</div>
          <div className={s.location}>
            <Location />
            {displayLocation}
          </div>
          <div className={s.prices}>
            <div className={s.priceText}>Incall: </div>
            <div className={s.priceValue}>£{displayRate}/hour</div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DuoCard;
