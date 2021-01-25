import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useFormikContext } from 'formik';
import { CastingFormState } from '@pages/Casting';
import s from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  startUpload,
  selectCastingData,
  CastingStateSlice,
  resetUploadData,
} from '@store/casting';
import { RootState } from '@store/reducer';
import { Line } from 'rc-progress';

interface Props {
  closeModal(): void;
  onSuccess(): void;
  onUpload(formikState: any): void;
}

const UploadModalFormik = ({ closeModal, onSuccess }: Props) => {
  const { values } = useFormikContext<CastingFormState>();
  const dispatch = useDispatch();
  const { uploadProgress, uploadSuccess, uploadError } = useSelector<
    RootState,
    CastingStateSlice
  >(selectCastingData);

  useEffect(() => {
    dispatch(startUpload(values));
  }, []);

  useEffect(() => {
    if (uploadSuccess) {
      dispatch(resetUploadData());
      onSuccess();
    }
  }, [uploadSuccess]);

  return (
    <div className={s.modal}>
      <form
        className={s.modalForm}
        onClick={e => e.stopPropagation()}
        onSubmit={e => e.preventDefault()}
      >
        <div className={s.modalTitle}>Submitting your application</div>
        <p className={s.modalDesc}>
          Please, don't close this window until all files are uploaded
        </p>
        <p
          className={s.progressLabel}
        >{`Submition progress ${uploadProgress}%`}</p>
        <Line
          style={{
            marginTop: '30px',
          }}
          percent={uploadProgress}
          strokeWidth={4}
          strokeColor="#FA1D52"
          strokeLinecap="butt"
        />
      </form>
    </div>
  );
};

export default UploadModalFormik;
