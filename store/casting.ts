import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { CastingFormState } from '@components/pages/Casting';
import { uploadBegan } from './upload-api';
import { RootState } from './reducer';

export interface CastingStateSlice {
  uploadProgress: number;
  uploading?: boolean;
  uploadSuccess?: boolean;
  uploadError?: boolean;
}

const casting = createSlice({
  name: 'casting',
  initialState: {
    uploadProgress: 0,
    uploadSuccess: false,
  } as CastingStateSlice,
  reducers: {
    startUpload: (state, action: PayloadAction<CastingFormState>) => {
      state.uploadProgress = 0;
      state.uploading = true;
      state.uploadSuccess = false;
      state.uploadError = false;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    uploadSuccess: state => {
      state.uploadSuccess = true;
      state.uploading = false;
    },
    uploadError: state => {
      state.uploadError = true;
    },
    resetUploadData: state => {
      state.uploadProgress = 0;
      state.uploadSuccess = false;
    },
  },
});

export default casting.reducer;

// Actions
export const startUpload = casting.actions.startUpload;
export const setUploadProgress = casting.actions.setUploadProgress;
export const uploadSuccess = casting.actions.uploadSuccess;
export const uploadError = casting.actions.uploadError;
export const resetUploadData = casting.actions.resetUploadData;

// Selectors
export const selectCastingData = createSelector<
  RootState,
  number,
  boolean,
  CastingStateSlice
>(
  state => state.casting.uploadProgress,
  state => state.casting.uploadSuccess,
  (uploadProgress, uploadSuccess) => ({ uploadProgress, uploadSuccess }),
);
