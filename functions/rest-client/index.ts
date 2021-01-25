import { EscortData } from './types';
import { ContentfulClientApi } from 'contentful';
// import contentful = require('contentful');
import * as contentful from 'contentful';
declare const CONT_SPACE_ID: string;
declare const CONT_ACCESS_TOKEN: string;

interface APIClient {
  getAllEscorts: () => Promise<contentful.EntryCollection<EscortData>>;
}

declare const __DEV__: boolean;

class ContentfulClient implements APIClient {
  client: ContentfulClientApi;

  constructor(space: string, accessToken: string) {
    this.client = contentful.createClient({
      space,
      accessToken,
    });
  }

  getAllEscorts(): Promise<contentful.EntryCollection<EscortData>> {
    return this.client.getEntries({
      content_type: 'escorts',
    });
  }

  log(...rest: string[]): void {
    if (__DEV__) {
      console.log(...rest);
    }
  }
}

export default ContentfulClient;
