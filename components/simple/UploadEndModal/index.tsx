import React from 'react';
import Button from '@simple/Button';
import s from './style.module.css';
import { CastingFormState, initialValues } from '@pages/Casting';
import { useFormikContext } from 'formik';
interface Props {
  closeModal(): void;
  title: string;
  description: string;
  buttonText: string;
  error?: boolean;
}

const UploadEndModal = ({
  error,
  closeModal,
  title,
  description,
  buttonText,
}: Props) => {
  const { setFormikState } = useFormikContext<CastingFormState>();

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className={s.modal}>
      <div className={s.modalWrapper} onClick={e => e.stopPropagation()}>
        <div className={s.modalTitle}>
          <span
            style={{
              color: error ? 'red' : 'black',
            }}
          >
            {title}
          </span>
        </div>
        <p className={s.modalDesc}>{description}</p>
        <Button onClick={handleClose}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default UploadEndModal;
