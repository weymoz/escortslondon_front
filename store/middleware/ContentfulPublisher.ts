import axios from '@store/client';

declare const CONT_ENVIRONMENT: string;
declare const CONT_SPACE_ID: string;
declare const CONT_MANAGEMENT_TOKEN: string;

export default class ContentfulPublisher {
  constructor(
    private space: string = CONT_SPACE_ID,
    private environment: string = CONT_ENVIRONMENT,
    private cmaToken: string = CONT_MANAGEMENT_TOKEN,
  ) {}

  async publish() {}

  addTextField(name: string) {}
}
