import {
  createSlice,
  createAction,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { SubmitReviewState } from '@simple/ReviewAddModal';
import { RootState } from './reducer';

export interface ReviewsStateSlice {
  submiting?: boolean;
  submitionSuccess?: boolean;
  submitionError?: boolean;
  submitionProgress?: number;
}

const initialState: ReviewsStateSlice = {
  submitionSuccess: false,
  submitionError: false,
  submitionProgress: 0,
};

const reviews = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    submitReview: (state, action: PayloadAction<SubmitReviewState>) => {},
    setSubmitionProgress: (state, action: PayloadAction<number>) => {
      state.submitionProgress = action.payload;
    },
    submitionError: state => {
      state.submitionError = true;
    },
    submitionSuccess: (state, action: PayloadAction<boolean>) => {
      state.submitionSuccess = action.payload;
    },
    cleanReviews: state => {
      state.submitionSuccess = false;
      state.submitionError = false;
      state.submitionProgress = 0;
    },
  },
});

export default reviews.reducer;

export const submitReview = reviews.actions.submitReview;
export const setSubmitionProgress = reviews.actions.setSubmitionProgress;
export const submitionError = reviews.actions.submitionError;
export const submitionSuccess = reviews.actions.submitionSuccess;
export const cleanReviews = reviews.actions.cleanReviews;

//Selectors
export const selectReviewsData = createSelector<
  RootState,
  boolean,
  boolean,
  number,
  ReviewsStateSlice
>(
  state => state.reviews.submitionSuccess,
  state => state.reviews.submitionError,
  state => state.reviews.submitionProgress,
  (submitionSuccess, submitionError, submitionProgress) => ({
    submitionSuccess,
    submitionError,
    submitionProgress,
  }),
);
