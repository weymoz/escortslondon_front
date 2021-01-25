import React from "react";
import PropTypes from "prop-types";
import { default as ReactRating } from "react-rating";

import SvgRating from "@svg/rating.svg";
import SvgRatingLg from "@svg/rating-lg.svg";

import s from "./style.module.css";

interface Props {
  rate: number;
  readonly?: boolean;
  withRate?: boolean;
  size?: string;
  onChange(v: number): void;
  onClick?: () => void;
}

const Rating = ({
  rate = 5,
  readonly = false,
  withRate = true,
  size = "",
  onChange,
  onClick,
}: Props) => {
  const RatingIcon = size === "lg" ? <SvgRatingLg /> : <SvgRating />;

  return (
    <div onClick={onClick} className={s.rating}>
      {withRate && (
        <div className={s.ratingRate}>
          {rate /*_.padEnd(rate.toString(), 3, '.0')*/}
        </div>
      )}
      <div className={s.ratingWrapper}>
        <ReactRating
          readonly={readonly}
          initialRating={rate}
          emptySymbol={<span className={s.ratingEmpty}>{RatingIcon}</span>}
          fullSymbol={<span className={s.ratingFull}>{RatingIcon}</span>}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

Rating.defaultProps = {
  rate: 5,
  readonly: false,
  withRate: true,
  size: "",
};

Rating.propTypes = {
  rate: PropTypes.number,
  readonly: PropTypes.bool,
  withRate: PropTypes.bool,
  size: PropTypes.string,
  onChange: PropTypes.func,
};

export default Rating;
