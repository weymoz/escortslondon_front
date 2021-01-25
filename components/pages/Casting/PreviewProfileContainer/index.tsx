import React from 'react';
import Profile from '@sections/Profile';
import { useFormikContext } from 'formik';
import { CastingFormState } from '@pages/Casting';
import { Escort } from '@store/escorts';
import EscortPreviewModel from '@models/EscortPreviewModel';

interface Props {
  closeModal(): void;
}

export default function PreviewProfileContainer({ closeModal }: Props) {
  const { values } = useFormikContext<CastingFormState>();
  const data: Escort = new EscortPreviewModel(values).preview;
  return <Profile closeModal={closeModal} data={data} preview />;
}
