import React, { ReactElement } from 'react';
import Title from '@simple/Title';
import Info from '@svg/info.svg';
import Check from '@svg/makeDate/check.svg';
import s from '../style.module.css';
import DropzoneFormik from '@simple/DropzoneFormik';
import { useFormikContext } from 'formik';
import { CastingFormState } from '..';
import cx from 'classnames';
import ErrorMessageFormik from '@simple/ErrorMessageFormik';

interface Props {}

export default function AddPhotosFields({}: Props): ReactElement {
  const {
    values: {
      galleryPhoto,
      portraitPhotos,
      verificationPhoto,
      landscapePhotos,
    },
  } = useFormikContext<CastingFormState>();

  const galleryPhotoAdded = !!galleryPhoto;

  const portraitPhotosAdded = !!(
    portraitPhotos.photo1 ||
    portraitPhotos.photo2 ||
    portraitPhotos.photo3 ||
    portraitPhotos.photo4 ||
    portraitPhotos.photo5 ||
    portraitPhotos.photo6
  );

  const verificationPhotoAdded = !!verificationPhoto;

  const landscapePhotosAdded = !!(
    landscapePhotos.photo1 || landscapePhotos.photo2
  );

  return (
    <>
      <div className={s.photochecklist}>
        <div className={s.servicesFiels__title}>
          <Title size="h6">Photochecklist</Title>
          <p>Add photos in high-quality</p>
        </div>
        <ul className={s.photochecklist__items}>
          <li>
            <div className={s.item__title}>
              <Check className={cx(galleryPhotoAdded && s.checked)} />
              Gallery photo
            </div>
            <p>only 1</p>
          </li>
          <li>
            <div className={s.item__title}>
              <Check className={cx(portraitPhotosAdded && s.checked)} />
              Library portrait photo{' '}
            </div>
            <p>(maximum of 6)</p>
          </li>
          <li>
            <div className={s.item__title}>
              <Check className={cx(landscapePhotosAdded && s.checked)} />
              Library landscape photo
            </div>
            <p>(maximum of 2)</p>
          </li>
          <li>
            <div className={s.item__title}>
              <Check className={cx(verificationPhotoAdded && s.checked)} />
              Verification photo
            </div>
            <p>only 1</p>
          </li>
        </ul>
      </div>
      <div className={s.library}>
        <div className={s.servicesFiels__title}>
          <Title size="h6">Library portrait photo</Title>
          <p>
            For profile page you should select a photo display tempalte e.g.
          </p>
        </div>
        <ul className={s.library__items}>
          <li>
            <DropzoneFormik name="portraitPhotos.photo1" />
          </li>
          <li>
            <DropzoneFormik name="portraitPhotos.photo2" />
          </li>
          <li>
            <DropzoneFormik name="portraitPhotos.photo3" />
          </li>
          <li>
            <DropzoneFormik name="portraitPhotos.photo4" />
          </li>
          <li>
            <DropzoneFormik name="portraitPhotos.photo5" />
          </li>
          <li>
            <DropzoneFormik name="portraitPhotos.photo6" />
          </li>
        </ul>
        <ErrorMessageFormik name="portraitPhotos" cssDisplay="block" />
      </div>
      <div className={s.verification}>
        <div className={s.servicesFiels__title}>
          <div className={s.servicesFiels__titleWrapper}>
            <Title size="h6">Verification photo</Title>
            <div className={s.infoTitle}>
              <div className={s.infoIcon}>
                <Info />
              </div>
              <img
                className={s.infoImage}
                src="assets/images/exampleImage.jpg"
                alt="example photo"
              />
            </div>
          </div>
          <p>Submit a natural photo of yourself without makeup</p>
        </div>
        <ul className={s.verification__items}>
          <li>
            <DropzoneFormik name="verificationPhoto" />
          </li>
        </ul>
        <ErrorMessageFormik name="verificationPhoto" cssDisplay="block" />
      </div>
      <div className={s.landspace}>
        <div className={s.servicesFiels__title}>
          <Title size="h6">Landscape photo</Title>
          <p>Select 2 landscape images</p>
        </div>
        <ul className={s.landspace__items}>
          <li>
            <DropzoneFormik name="landscapePhotos.photo1" />
          </li>
          <li>
            <DropzoneFormik name="landscapePhotos.photo2" />
          </li>
        </ul>
        <ErrorMessageFormik name="landscapePhotos" cssDisplay="block" />
      </div>
    </>
  );
}
