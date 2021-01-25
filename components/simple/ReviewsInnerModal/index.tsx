import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Title from '@simple/Title';
import ReviewCard from '@simple/ReviewCard';
import Button from '@simple/Button';
import { selectReviews, selectProfileData } from '@store/profile';
import { Review } from '@typedefs/app';
import { RootState } from '@store/reducer';
import { useSelector } from 'react-redux';
import Star from '@svg/star.svg';

import s from './style.module.css';
import { Escort } from '@store/escorts';

interface Props {
  handleAddReview(): void;
  onRequestClose(): void;
}

const ReviewsInnerModal = ({ handleAddReview, onRequestClose }: Props) => {
  const handleReview = () => {
    onRequestClose();
    handleAddReview();
  };
  const reviews = useSelector<RootState, Review[]>(selectReviews);
  const { title, age } = useSelector<RootState, Escort>(selectProfileData);
  return (
    <div className={s.root}>
      <div className={s.top}>
        <Title size="h6" after={`${age || ''} years old`}>
          {title ? `About ${title}` : ''}
        </Title>
      </div>
      <div className={s.list}>
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review, i) => (
            <ReviewCard key={i} review={review} className="column" />
          ))}
      </div>
      <div className={s.bottom} onClick={handleReview}>
        <Button size="sm">
          Submit review
          <Star />
        </Button>
      </div>
    </div>
  );
};

export default ReviewsInnerModal;
