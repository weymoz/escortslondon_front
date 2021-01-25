import ContentfulClient from '@functions/rest-client';

declare const CONT_SPACE_ID: string;
declare const CONT_ACCESS_TOKEN: string;

export default new ContentfulClient(CONT_SPACE_ID, CONT_ACCESS_TOKEN);
