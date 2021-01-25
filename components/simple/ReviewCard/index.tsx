import React from 'react';
import Rating from '@simple/Rating';
import { Review as ReviewType } from '@typedefs/app';
import ShowMoreText from 'react-show-more-text';

import s from './style.module.css';

interface Props {
  review: ReviewType;
  className?: string;
}

const Review = ({ review, className }: Props) => {
  return (
    <div key={review.name} className={`${s.listItem} ${s[className]}`}>
      <div className={s.listItemTop}>
        <div className={s.listInfo}>
          <div className={s.listInfoItem}>{review.visitType}</div>
          <div className={s.listInfoDot}></div>
          <div className={s.listInfoItem}>{review.duration}</div>
        </div>
        <Rating rate={+review.rating} readonly={true} />
      </div>
      <div className={s.listItemContent}>
        <ShowMoreText
          lines={3}
          more="Show more"
          less="Show less"
          className={s.contentWrapper}
          anchorClass={s.readMore}
          expanded={false}
          keepNewLines={true}
        >
          {review.content}
          {/*review.content.split('\n').map(paragraph => {
            return <p className={s.contentParagraph}>{paragraph}</p>;
          })*/}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default Review;
