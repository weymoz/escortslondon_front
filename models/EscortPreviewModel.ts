import { CastingFormState, CastingRatesDuration } from '@pages/Casting';
import {
  Escort,
  RatesData,
  RatesPerTimeData,
  RatesPerPlaceData,
  LocationData,
} from '@store/escorts';
export default class EscortPreviewModel {
  constructor(private data: CastingFormState) {}

  get preview(): Escort {
    return {
      id: '1',
      title: this.getTitle(),
      imageUrl: this.getImageUrl(),
      additionalImageUrls: this.getAdditionalImageUrls(),
      age: this.getAge(),
      nationality: this.getNationality(),
      orientation: this.getOrientation(),
      bodyType: this.getBodyType(),
      bust: this.getBust(),
      hair: this.getHair(),
      height: this.getHeight(),
      language: this.getLanguage(),
      about: this.getAbout(),
      notice: this.getNotice(),
      rates: this.getRates(),
      location: this.getLocation(),
      services: this.getServices(),
    };
  }

  getTitle(): string {
    return this.data.name;
  }

  getImageUrl(): string {
    return this.createImageSrc(this.data.galleryPhoto);
  }

  getAdditionalImageUrls(): string[] {
    const images: string[] = [];
    for (const key in this.data.portraitPhotos) {
      images.push(this.createImageSrc(this.data.portraitPhotos[key]));
    }
    for (const key in this.data.landscapePhotos) {
      images.push(this.createImageSrc(this.data.landscapePhotos[key]));
    }
    images.push(this.createImageSrc(this.data.verificationPhoto));
    return images;
  }

  createImageSrc(file: File): string {
    return file ? URL.createObjectURL(file) : '';
  }

  getAge(): number {
    return this.data.age ? this.data.age.value : 0;
  }

  getNationality(): string {
    return this.data.nationality ? this.data.nationality.value : '';
  }

  getOrientation(): string {
    return this.data.orientation ? this.data.orientation.value : '';
  }

  getBodyType(): string {
    return this.data.bodyType ? this.data.bodyType.value : '';
  }

  getBust(): string {
    return this.data.bust ? this.data.bust.value : '';
  }

  getHair(): string {
    return '';
  }

  getHeight(): string {
    return this.data.height ? this.data.height.value : '';
  }

  getLanguage(): string {
    return '';
  }

  getAbout(): string {
    return this.data.about;
  }

  getNotice(): string[] {
    return this.data.notice ? this.data.notice.split('\n') : [];
  }

  getRates(): RatesData {
    return {
      gbp: this.getRatesPerTime('gbp'),
      usd: this.getRatesPerTime(),
      eur: this.getRatesPerTime(),
    };
  }

  getRatesPerTime(currency?: string | undefined): RatesPerTimeData {
    if (currency === 'gbp') {
      return {
        '1_One hour': this.getRatesPerPlace('One hour'),
        '3_Two hours': this.getRatesPerPlace('Two hours'),
        '6_Overnight': this.getRatesPerPlace('Overnight'),
        '2_90 minutes': this.getRatesPerPlace('90 minutes'),
        '4_Three hours': this.getRatesPerPlace(),
        '5_Additional hour': this.getRatesPerPlace('Additional hour'),
      };
    }

    return {
      '1_One hour': this.getRatesPerPlace(),
      '3_Two hours': this.getRatesPerPlace(),
      '6_Overnight': this.getRatesPerPlace(),
      '2_90 minutes': this.getRatesPerPlace(),
      '4_Three hours': this.getRatesPerPlace(),
      '5_Additional hour': this.getRatesPerPlace(),
    };
  }

  getRatesPerPlace(time?: CastingRatesDuration | undefined): RatesPerPlaceData {
    if (!time || !this.data.rates) {
      return {
        incall: '',
        outcall: '',
      };
    }
    return {
      incall: this.data.rates.incall[time],
      outcall: this.data.rates.outcall[time],
    };
  }

  getLocation(): LocationData {
    return this.data.location;
  }

  getServices(): string[] {
    return this.data.services;
  }
}
