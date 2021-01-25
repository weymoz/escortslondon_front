import {
  CastingPageSettings,
  CastingPageSettingsFields,
  CastingPageSettingsResponse,
} from "@typedefs/app";

export default class CastingPageSettingsModel {
  private data: CastingPageSettingsFields;

  constructor(data: CastingPageSettingsResponse) {
    this.data = data?.items[0].fields;
  }

  getSerializable(): CastingPageSettings {
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
