export interface Escort {
  title: string;
  thumbnail: string;
  gallery: string[];
  age: number;
  about: string;
  nationality: string;
  orientation: string;
  bodyType: string;
  hair: string;
  bust: string;
  height: string;
  language: string;
  notice: string[];
  services: string[];
  rates: Rates | null;
  location: Location | null;
}

export interface EscortsDuo {
  title: string;
  slug: string;
  updatedAt?: string;
  titleMetaTag: string;
  metaDescriptionTag: string;
  thumbnail: string[];
  escort_1?: Escort | null;
  escort_2?: Escort | null;
  about?: string;
  services?: string[];
  rates?: Rates | null;
  location?: Location | null;
  displayRate: string;
  displayLocation: string;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  titleMetaTag?: string;
  metaDescriptionTag: string;
  galleryLine1: string;
  galleryLine2: string;
  galleryLine3: string;
}

export interface Review {
  rating: number;
  phone: string;
  visitType: string;
  time?: string;
  duration: string;
  content: string;
  name: string;
}

export interface CreateReviewEntryFields {
  rating: Locale<number>;
  visitType: Locale<string>;
  time: Locale<string>;
  duration: Locale<string>;
  content: Locale<string>;
  name: Locale<string>;
  phone: Locale<string>;
}

interface Locale<T> {
  "en-US": T;
}

export type VisitType = "incall" | "outcall";

export type VisitDuration =
  | "one hour"
  | "90 minutes"
  | "two hours"
  | "overnight";

export interface ReviewFields {
  name: string;
  phone: string;
  duration: string;
  rating: number;
  time: string;
  visitType: string;
  content: any;
}

export interface EscortFields {
  title?: string;
  photos?: ContentfulLink[];
  photosAdditiona?: ContentfulLink[];
  age?: number;
  about?: string;
  nationality?: string;
  orientation?: string;
  bodyType?: string;
  hair?: string;
  bust?: string;
  height?: string;
  language?: string;
  notice?: string;
  services?: string[];
  rates?: Rates;
  location?: Location;
  reviews?: ContentfulLink[];
}

export interface EscortsDuoFields {
  title?: string;
  slug?: string;
  titleMetaTag?: string;
  metaDescriptionTag?: string;
  escort_1?: ContentfulLink;
  escort_2?: ContentfulLink;
  about?: string;
  services?: string[];
  rates?: Rates;
  location?: Location;
}

export interface Rates {
  eur: RatePerTime;
  gbp: RatePerTime;
  usd: RatePerTime;
}

export interface RatePerTime {
  "1_One hour": RatePerLocation;
  "3_Two hours": RatePerLocation;
  "6_Overnight": RatePerLocation;
  "2_90 minutes": RatePerLocation;
  "4_Three hours": RatePerLocation;
  "5_Additional hour": RatePerLocation;
}

export interface AssetFields {
  title: string;
  file: {
    url: string;
    details: {
      size: number;
      image: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

export interface RatePerLocation {
  incall: string;
  outcall: string;
}

export interface Location {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

export interface ServiceFields {
  title?: string;
  slug?: string;
  description?: string;
  titleMetaTag?: string;
  metaDescriptionTag?: string;
  galleryLine1: string;
  galleryLine2: string;
  galleryLine3: string;
}

export interface ContentfulApiData<D, E, A = AssetFields> {
  sys: ContentfulApiDataSys;
  total: number;
  skip: number;
  limit: number;
  items: ContentfulItem<D>[];
  includes: Includes<E, A>;
}

export interface ContentfulApiDataSys {
  type: string;
  updatedAt: string;
}

export interface Includes<E, A = AssetFields> {
  Entry: ContentfulItem<E>[];
  Asset: ContentfulItem<A>[];
}

export interface ContentfulItem<T = any> {
  sys: ContentfulItemSys;
  fields: T;
}

export interface ContentfulItemSys {
  space?: ContentfulLink;
  id: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  environment?: ContentfulLink;
  revision?: number;
  version?: number;
  contentType?: ContentfulLink;
  locale?: string;
}

export interface ContentfulLink {
  sys: ContentfulLinkSys;
}

export interface ContentfulLinkSys {
  type: string;
  linkType: string;
  id: string;
}

export type EscortsResponse = ContentfulApiData<
  EscortFields,
  ReviewFields,
  AssetFields
>;

export type EscortsDuoResponse = ContentfulApiData<
  EscortsDuoFields,
  EscortFields,
  AssetFields
>;

export type ServiceResponse = ContentfulApiData<
  ServiceFields,
  undefined,
  undefined
>;

export interface FilterApiEscortsDuoResponse {
  title: string;
  slug: string;
  thubnail: string[];
  displayRate: string;
  displayLocation: string;
}

export interface FilterApiEscortsByServiceResponse {
  total: number;
  items: FilterApiEscortFields[];
}

export interface FilterApiEscortFields {
  id?: string;
  title?: string;
  location?: string;
  services?: string[];
  filterableServices?: MenuItem[];
  hair?: string;
  bodyType?: string;
  bust?: string;
  incallRate?: number;
  outcallRate?: number;
  imageUrl?: string | undefined;
  newTag?: boolean;
  recommendedTag?: boolean;
}

export interface EscortFiltered {
  id: string;
  title: string;
  location: string;
  incallRate: string;
  outcallRate: string;
  thumbnail: string;
  newTag: boolean;
  recommendedTag: boolean;
  slug: string;
}

export interface ReactSelectOption<T = string> {
  label: string;
  value: T;
}

export interface MenuItem {
  slug: string;
  title: string;
  subMenu?: MenuItem[];
}

export interface DuoEscortsFilterRequestParams {
  location: string[];
  price: string[];
  services: string[];
}

export interface ContentfulUploadFileResponse {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    expiresAt: string;
    space: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    createdBy: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
  };
}

export interface ContentfulCreateAssetFields {
  title: {
    "en-US": string;
  };
  file: {
    "en-US": {
      fileName: string;
      uploadFrom: {
        sys: ContentfulLinkSys;
        contentType: string;
      };
    };
  };
}

export type ContentfulCreateAssetResponse = ContentfulItem<
  ContentfulCreateAssetFields
>;

export interface ContentfulUpdateEntryFields {
  reviews: {
    "en-US": ContentfulLink[];
  };
  [other: string]: any;
}

export type ContentfulUpdateEntryRequest = ContentfulItem<
  ContentfulUpdateEntryFields
>;

export interface GoogleMapsResponse {
  results: GoogleMapsResult[];
}

export interface GoogleMapsResult {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface SmsApiResponse {
  response: any;
  error: any;
  hashCode: string;
}

//-------- Main Page Setttings ---------

export interface MainPageSettingsFields {
  titleMetaTag: string;
  metaDescriptionTag: string;
  mainPageHeader: string;
  searchTitle: string;
  galleryTextLine1: string;
  galleryTextLine2: string;
  welcomeTitle: string;
  welcomeText: string;
  aboutUsBlock1Title: string;
  aboutUsBlock1Text: string;
  aboutUsLeftColumn: ContentfulLink[];
  aboutUsRightColumn: ContentfulLink[];
  recommendedLine1: string;
  recommendedLine2: string; //
  callToActionTitle: string;
  callToActionText: string;
  callToActionButtonWrapperTitle: string;
  callToActionButtonWrapperText: string;
  phone: string;
  whatsApp: string;
  callToActionFooterSiteDescription: string;
  callToActionFooterTitle: string;
  callToActionFooterText: string;
  termsFooter: string;
}

export type MainPageSettingsResponse = ContentfulApiData<
  MainPageSettingsFields,
  AboutUsInfoBlockFields,
  AssetFields
>;

export interface TextBlock {
  title: string;
  text: string;
}
export interface MainPageSettings {
  titleMetaTag: string;
  metaDescriptionTag: string;
  mainPageHeader: string;
  searchTitle: string;
  galleryTextLine1: string;
  galleryTextLine2: string;
  welcomeTitle: string;
  welcomeText: string;
  aboutUs: TextBlock;
  aboutUsLeftColumn: AboutUsInfoBlock[];
  aboutUsRightColumn: AboutUsInfoBlock[];
  recommendedLine1: string;
  recommendedLine2: string;
  callToActionTitle: string;
  callToActionText: string;
  callToActionButtonWrapperTitle: string;
  callToActionButtonWrapperText: string;
  phone: string;
  whatsApp: string;
  callToActionFooterSiteDescription: string;
  callToActionFooterTitle: string;
  callToActionFooterText: string;
  termsFooter: string;
}

export type PageSettings = MainPageSettings;

export interface AboutUsInfoBlockFields {
  icon: ContentfulLink;
  title: string;
  text: string;
}

export interface AboutUsInfoBlock {
  iconId: string;
  iconUrl?: string;
  title: string;
  text: string;
}
//-------- Services Page Settings -------
export interface ServicePageSettingsFields extends MainPageSettingsFields {
  galleryTextLine3: string;
  title: string;
  description: string;
  slug: string;
}

export type ServicePageSettingsResponse = ContentfulApiData<
  ServicePageSettingsFields,
  AboutUsInfoBlockFields,
  AssetFields
>;

export interface ServicePageSettings extends MainPageSettings {
  title: string;
  description: string;
  slug: string;
  galleryTextLine3: string;
}

//-------- Escorts Duo Page Settings -------
export interface EscortsDuoPageSettingsFields extends MainPageSettingsFields {
  galleryTextLine3: string;
}

export type EscortsDuoPageSettingsResponse = ContentfulApiData<
  EscortsDuoPageSettingsFields,
  AboutUsInfoBlockFields,
  AssetFields
>;

export interface EscortsDuoPageSettings extends MainPageSettings {
  galleryTextLine3: string;
}

//------ Profile Page Settings -------------
export interface ProfilePageSettingsFields {
  recommendedLine1: string;
  recommendedLine2: string; //
  callToActionTitle: string;
  callToActionText: string;
  callToActionButtonWrapperTitle: string;
  callToActionButtonWrapperText: string;
  callToActionFooterSiteDescription: string;
  callToActionFooterTitle: string;
  callToActionFooterText: string;
  termsFooter: string;
}

export type ProfilePageSettingsResponse = ContentfulApiData<
  ProfilePageSettingsFields,
  undefined,
  undefined
>;

export interface ProfilePageSettings {
  recommendedLine1: string;
  recommendedLine2: string;
  callToActionTitle: string;
  callToActionText: string;
  callToActionButtonWrapperTitle: string;
  callToActionButtonWrapperText: string;
  callToActionFooterSiteDescription: string;
  callToActionFooterTitle: string;
  callToActionFooterText: string;
  termsFooter: string;
}

//------ Duo Profile Page Settings -------------
export interface DuoProfilePageSettingsFields
  extends ProfilePageSettingsFields {}

export type DuoProfilePageSettingsResponse = ContentfulApiData<
  DuoProfilePageSettingsFields,
  undefined,
  undefined
>;

export interface DuoProfilePageSettings extends ProfilePageSettings {}

//------ Casting Page Settings -------------
export interface CastingPageSettingsFields {
  titleMetaTag: string;
  metaDescriptionTag: string;
}

export type CastingPageSettingsResponse = ContentfulApiData<
  CastingPageSettingsFields,
  undefined,
  undefined
>;

export interface CastingPageSettings {
  titleMetaTag: string;
  metaDescriptionTag: string;
}

//------ Terms Page Settings -------------
export interface TermsPageSettingsFields {
  titleMetaTag: string;
  metaDescriptionTag: string;
}

export type TermsPageSettingsResponse = ContentfulApiData<
  TermsPageSettingsFields,
  undefined,
  undefined
>;

export interface TermsPageSettings {
  titleMetaTag: string;
  metaDescriptionTag: string;
}

//-------- FAQ Page Settings -----------
export interface FaqPageSettingsFields {
  headerTitle: string;
  headerSubtitle: string;
  headerText: string;
  questions: ContentfulLink[];
  titleMetaTag: string;
  metaDescriptionTag: string;
}

export interface FaqItemFields {
  question: string;
  answer: string;
}

export type FaqPageSettingsResponse = ContentfulApiData<
  FaqPageSettingsFields,
  FaqItemFields,
  undefined
>;

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

export interface FaqPageSettings {
  headerTitle: string;
  headerSubtitle: string;
  headerText: string;
  questions: FaqItem[];
  titleMetaTag: string;
  metaDescriptionTag: string;
}

export type CardLinkType = "html" | "router";

export type ProfileType = "escort" | "duo escort";
