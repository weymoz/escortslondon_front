import {
  TermsPageSettings,
  TermsPageSettingsFields,
  TermsPageSettingsResponse,
} from "@typedefs/app";

export default class TermsPageSettingsModel {
  private data: TermsPageSettingsFields;

  constructor(data: TermsPageSettingsResponse) {
    this.data = data?.items[0].fields;
  }

  getSerializable(): TermsPageSettings {
    return {
      titleMetaTag: this.getTitleMetaTag(),
      metaDescriptionTag: this.getMetaDescriptionTag(),
    };
  }

  getTitleMetaTag(): string {
    return this.data.titleMetaTag || "";
  }

  getMetaDescriptionTag(): string {
    return this.data.metaDescriptionTag || "";
  }
}
