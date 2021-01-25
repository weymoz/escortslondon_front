import {
  ContentfulItem,
  EscortsDuoFields,
  EscortFields,
  AssetFields,
  Includes,
  ContentfulLink,
  EscortsDuo,
  Escort,
  Location,
} from "@typedefs/app";
import Model from "@models/Model";
import EscortModel from "@models/EscortModel";

export default class EscortsDuoModel extends Model {
  constructor(
    private data: ContentfulItem<EscortsDuoFields>,
    includes: Includes<EscortFields>
  ) {
    super(includes);
  }

  getSerializable(): EscortsDuo {
    return {
      title: this.getTitle(),
      slug: this.getSlug(),
      thumbnail: this.getThumbnail(),
      escort_1: this.getEscort(1),
      escort_2: this.getEscort(2),
      about: this.getAbout(),
      services: this.getServices(),
      rates: this.getRates(),
      location: this.getLocation(),
      displayRate: this.getDisplayRate(),
      displayLocation: this.getDisplayLocation(),
      titleMetaTag: this.getTitleMetaTag(),
      metaDescriptionTag: this.getMetaDescriptionTag(),
      updatedAt: this.getUpdatedAt(),
    };
  }

  getUpdatedAt(): string {
    return this.data?.sys?.updatedAt || "";
  }

  getTitle() {
    return this.data.fields.title || "";
  }

  getTitleMetaTag(): string {
    return this.data.fields.titleMetaTag || "";
  }

  getMetaDescriptionTag(): string {
    return this.data.fields.metaDescriptionTag || "";
  }

  getSlug() {
    return this.data.fields.slug || "";
  }

  getThumbnail() {
    return [
      this.getEscort(1)?.thumbnail || "",
      this.getEscort(2)?.thumbnail || "",
    ];
  }

  getAbout() {
    return this.data.fields.about || "";
  }

  getServices() {
    if (!this.data.fields.services || this.data.fields.services.length === 0)
      return [];
    return this.data.fields.services;
  }

  getEscort(n: number): Escort | null {
    const escortName = `escort_${n}` as keyof EscortsDuoFields;
    const id = (this.data.fields[escortName] as ContentfulLink).sys.id;
    const data = this.getIncludedEntryById(id);
    if (!data) return null;
    const escort = new EscortModel(data, this.includes);
    return escort.getSerializable();
  }

  getRates() {
    if (!this.data.fields.rates) return null;
    return this.data.fields.rates;
  }

  getLocation(): Location | null {
    if (!this.data.fields.location) return null;
    return this.data.fields.location;
  }

  getDisplayRate(): string {
    return this.getRates()?.gbp["1_One hour"].incall || "";
  }

  getDisplayLocation(): string {
    return this.getLocation()?.name || "";
  }
}
