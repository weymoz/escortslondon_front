import * as contentful from 'contentful';

declare const CONT_SPACE_ID: string;
declare const CONT_ACCESS_TOKEN: string;

const client = contentful.createClient({
  space: CONT_SPACE_ID,
  accessToken: CONT_ACCESS_TOKEN,
});

export default client;
