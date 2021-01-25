import {
  EscortsDuoPageSettingsResponse,
  EscortsDuoPageSettings,
  EscortsDuoPageSettingsFields,
} from "@typedefs/app";
import MainPageSettingsModel from "./MainPageSettingsModel";
export default class EscortsDuoPageSettingsModel extends MainPageSettingsModel {
  private duoData: EscortsDuoPageSettingsFields;
  constructor(data: EscortsDuoPageSettingsResponse) {
    super(data);

    this.duoData = data?.items[0]?.fields;
  }

  getSerializable(): EscortsDuoPageSettings {
    return {
      ...super.getSerializable(),
      galleryTextLine3: this.getGalleryTextLine3(),
    };
  }

  getGalleryTextLine3(): string {
    return this.duoData.galleryTextLine3 || "";
  }
}
