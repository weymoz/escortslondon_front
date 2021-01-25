import {
  EscortFields,
  ContentfulItem,
  Includes,
  Escort,
  Rates,
  Location,
} from '@typedefs/app';
import Model from '@models/Model';

export default class EscortModel extends Model {
  constructor(
    private data: ContentfulItem<EscortFields>,
    includes: Includes<EscortFields>,
  ) {
    super(includes);
  }

  getSerializable(): Escort {
    return {
      title: this.getTitle(),
      thumbnail: this.getThumbnail(),
      gallery: this.getGallery(),
      age: this.getAge(),
      about: this.getAbout(),
      nationality: this.getNationality(),
      orientation: this.getOrientation(),
      bodyType: this.getBodyType(),
      hair: this.getHair(),
      bust: this.getBust(),
      height: this.getHeight(),
      language: this.getLanguage(),
      notice: this.getNotice(),
      services: this.getServices(),
      rates: this.getRates(),
      location: this.getLocation(),
    };
  }

  getTitle() {
    return this.data.fields.title || '';
  }

  getThumbnail(): string {
    if (!this.data.fields.photos || this.data.fields.photos.length === 0)
      return '';
    const id = this.data.fields.photos[0].sys.id;
    const thumbnail = super.getIncludedAssetById(id)?.fields.file.url;
    return thumbnail || '';
  }

  getGallery(): string[] {
    if (!this.data.fields.photosAdditiona) return [];
    const photos = this.data.fields.photosAdditiona.map(
      item => super.getIncludedAssetById(item.sys.id)?.fields.file.url || '',
    );
    return photos;
  }

  getAge(): number {
    return this.data.fields.age || 0;
  }

  getAbout(): string {
    return this.data.fields.about || '';
  }

  getNationality(): string {
    return this.data.fields.nationality || '';
  }

  getOrientation(): string {
    return this.data.fields.orientation || '';
  }

  getBodyType(): string {
    return this.data.fields.bodyType || '';
  }

  getHair(): string {
    return this.data.fields.hair || '';
  }

  getBust(): string {
    return this.data.fields.bust || '';
  }

  getHeight(): string {
    return this.data.fields.height || '';
  }

  getLanguage(): string {
    return this.data.fields.language || '';
  }

  getNotice(): string[] {
    if (!this.data.fields.notice) return [];
    const notices = this.data.fields.notice.split('\n');
    return notices;
  }

  getServices(): string[] {
    if (!this.data.fields.services || this.data.fields.services.length === 0)
      return [];
    return this.data.fields.services;
  }

  getRates(): Rates | null {
    if (!this.data.fields.rates) return null;
    return this.data.fields.rates;
  }

  getLocation(): Location | null {
    if (!this.data.fields.location) return null;
    return this.data.fields.location;
  }
}
