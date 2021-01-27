import {
  ServicePageSettingsResponse,
  ServicePageSettingsFields,
  ServicePageSettings,
} from "@typedefs/app";
import MainPageSettingsModel from "./MainPageSettingsModel";
export default class ServicePageSettingsModel extends MainPageSettingsModel {
  private serviceData: ServicePageSettingsFields;

  constructor(data: ServicePageSettingsResponse) {
    super(data);

    this.serviceData = data?.items[0]?.fields;
  }

  getSerializable(): ServicePageSettings {
    return {
      ...super.getSerializable(),
      title: this.getTitle(),
      description: this.getDescription(),
      slug: this.getSlug(),
      galleryTextLine3: this.getGalleryTextLine3(),
    };
  }

  getTitle(): string {
    return this.serviceData?.title || "";
  }

  getDescription(): string {
    return this.serviceData?.description || "";
  }

  getSlug(): string {
    return this.serviceData?.slug || "";
  }

  getGalleryTextLine3(): string {
    return this.serviceData?.galleryTextLine3 || "";
  }
}
