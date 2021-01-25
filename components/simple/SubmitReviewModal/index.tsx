import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import s from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/reducer';
import { Line } from 'rc-progress';
import {
  submitReview,
  selectReviewsData,
  ReviewsStateSlice,
} from '@store/reviews';
import { SubmitReviewState } from '@simple/ReviewAddModal';

interface Props {
  closeModal(): void;
  onSuccess(): void;
  onError?: () => void;
}

const SubmitReviewModal = ({ closeModal, onError, onSuccess }: Props) => {
  const { values } = useFormikContext<SubmitReviewState>();
  const dispatch = useDispatch();
  const { submitionError, submitionSuccess, submitionProgress } = useSelector<
    RootState,
    ReviewsStateSlice
  >(selectReviewsData);

  useEffect(() => {
    dispatch(submitReview(values));
  }, []);

  useEffect(() => {
    if (submitionSuccess) {
      onSuccess();
    } else if (submitionError) {
      onError();
    }
  }, [submitionSuccess, submitionError]);

  return (
    <div className={s.modal}>
      <form
        className={s.modalForm}
        onClick={e => e.stopPropagation()}
        onSubmit={e => e.preventDefault()}
      >
        <div className={s.modalTitle}>Submitting your review</div>
        <p className={s.modalDesc}>
          Please, don't close this window until all files are uploaded
        </p>
        <p
          className={s.progressLabel}
        >{`Submition progress ${submitionProgress}%`}</p>
        <Line
          style={{
            marginTop: '30px',
          }}
          percent={submitionProgress}
          strokeWidth={4}
          strokeColor="#FA1D52"
          strokeLinecap="butt"
        />
      </form>
    </div>
  );
};

export default SubmitReviewModal;
