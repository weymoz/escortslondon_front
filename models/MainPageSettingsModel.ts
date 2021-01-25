import {
  MainPageSettingsResponse,
  MainPageSettings,
  MainPageSettingsFields,
  TextBlock,
  AboutUsInfoBlockFields,
  AboutUsInfoBlock,
  ContentfulLink,
} from "@typedefs/app";
import AboutUsInfoBlockModel from "./AboutUsInfoBlockModel";
import Model from "./Model";

export default class MainPageSettingsModel extends Model<
  AboutUsInfoBlockFields
> {
  private data: MainPageSettingsFields;
  constructor(data: MainPageSettingsResponse) {
    try {
      super(data.includes);
      this.data = data.items[0].fields;
    } catch (e) {
      throw new Error(
        "No items returned from main page settings request to contentful api"
      );
    }
  }

  getSerializable(): MainPageSettings {
    return {
      titleMetaTag: this.getTitleMetaTag(),
      metaDescriptionTag: this.getMetaDescriptionTag(),
      mainPageHeader: this.getMainPageHeader(),
      searchTitle: this.getSearchTitle(),
      galleryTextLine1: this.getGalleryTextLine1(),
      galleryTextLine2: this.getGalleryTextLine2(),
      welcomeTitle: this.getWelcomeTitle(),
      welcomeText: this.getWelcomeText(),
      aboutUs: this.getAboutUs(),
      aboutUsLeftColumn: this.getAboutUsLeftColumn(),
      aboutUsRightColumn: this.getAboutUsRightColumn(),
      recommendedLine1: this.getRecommendedLine1(),
      recommendedLine2: this.getRecommendedLine2(),
      callToActionTitle: this.getCallToActionTitle(),
      callToActionText: this.getCallToActionText(),
      callToActionButtonWrapperTitle: this.getCallToActionButtonWrapperTitle(),
      callToActionButtonWrapperText: this.getCallToActionButtonWrapperText(),
      phone: this.getPhone(),
      whatsApp: this.getWhatsApp(),
      callToActionFooterSiteDescription: this.getCallToActionFooterSiteDescription(),
      callToActionFooterTitle: this.getCallToActionFooterTitle(),
      callToActionFooterText: this.getCallToActionFooterText(),
      termsFooter: this.getTermsFooter(),
    };
  }

  getAboutUsLeftColumn(): AboutUsInfoBlock[] {
    return this.getAboutUsColumn(this.data.aboutUsLeftColumn);
  }

  getAboutUsRightColumn(): AboutUsInfoBlock[] {
    return this.getAboutUsColumn(this.data.aboutUsRightColumn);
  }

  getAboutUsColumn(columnData: ContentfulLink[]): AboutUsInfoBlock[] {
    const infoBlocks = columnData?.map((item) => {
      const foundEntry = this.getIncludedEntryById(item.sys.id);
      const infoBlock = new AboutUsInfoBlockModel(foundEntry).getSerializable();

      if (infoBlock.iconId) {
        const foundAsset = this.getIncludedAssetById(infoBlock.iconId);
        if (foundAsset) {
          infoBlock.iconUrl = foundAsset.fields.file.url;
        }
      }
      return infoBlock;
    });
    return infoBlocks?.filter((infoBlock) => !!infoBlock) || null;
  }

  getTitleMetaTag(): string {
    return this.data.titleMetaTag || "";
  }
  getMetaDescriptionTag(): string {
    return this.data.metaDescriptionTag || "";
  }
  getMainPageHeader(): string {
    return this.data.mainPageHeader || "";
  }

  getSearchTitle(): string {
    return this.data.searchTitle || "";
  }

  getGalleryTextLine1() {
    return this.data.galleryTextLine1 || "";
  }

  getGalleryTextLine2() {
    return this.data.galleryTextLine2 || "";
  }

  getWelcomeTitle() {
    return this.data.welcomeTitle || "";
  }

  getWelcomeText() {
    return this.data.welcomeText || "";
  }

  getAboutUs(): TextBlock {
    return {
      title: this.data.aboutUsBlock1Title || "",
      text: this.data.aboutUsBlock1Text || "",
    };
  }

  getRecommendedLine1(): string {
    return this.data.recommendedLine1 || "";
  }

  getRecommendedLine2(): string {
    return this.data.recommendedLine2 || "";
  }

  getCallToActionTitle(): string {
    return this.data.callToActionTitle || "";
  }

  getCallToActionText(): string {
    return this.data.callToActionText || "";
  }

  getCallToActionButtonWrapperTitle(): string {
    return this.data.callToActionButtonWrapperTitle || "";
  }

  getCallToActionButtonWrapperText() {
    return this.data.callToActionButtonWrapperText || "";
  }

  getPhone(): string {
    return this.data.phone || "";
  }

  getWhatsApp(): string {
    return this.data.whatsApp || "";
  }

  getCallToActionFooterSiteDescription(): string {
    return this.data.callToActionFooterSiteDescription || "";
  }

  getCallToActionFooterTitle(): string {
    return this.data.callToActionFooterTitle || "";
  }

  getCallToActionFooterText(): string {
    return this.data.callToActionFooterText || "";
  }

  getTermsFooter(): string {
    return this.data.termsFooter || "";
  }

  getTextBlockN(
    blockName: string,
    blockNumber: number,
    blockElement: "Title" | "Text"
  ) {
    const fieldName = `${blockName}Block${blockNumber}${blockElement}`;
    const result = this.data[fieldName] || "";
    return result;
  }

  getTextBlocks(blockName: string, n: number): TextBlock[] {
    return new Array(n).fill(0).map((_, i) => {
      return {
        title: this.getTextBlockN(blockName, i + 1, "Title"),
        text: this.getTextBlockN(blockName, i + 1, "Text"),
      };
    });
  }
}
