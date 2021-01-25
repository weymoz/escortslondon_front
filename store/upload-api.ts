import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { CastingFormState } from '@components/pages/Casting';

declare const CONT_ENVIRONMENT: string;
declare const CONT_SPACE_ID: string;
declare const CONT_ACCESS_TOKEN: string;
declare const CONT_MANAGEMENT_TOKEN: string;

const contentfulUploadBaseURL = `https://upload.contentful.com/spaces/${CONT_SPACE_ID}/uploads`;

export interface ContentfulUploadBeganPayload {
  castingFormState: CastingFormState;
}

export const uploadBegan = createAction<CastingFormState>('upload/began');
