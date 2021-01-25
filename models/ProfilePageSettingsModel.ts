import {
  ProfilePageSettingsResponse,
  ProfilePageSettings,
  ProfilePageSettingsFields,
} from "@typedefs/app";

export default class ProfilePageSettingsModel {
  private data: ProfilePageSettingsFields;

  constructor(data: ProfilePageSettingsResponse) {
    this.data = data?.items[0]?.fields;
  }

  getSerializable(): ProfilePageSettings {
    return {
      recommendedLine1: this.getRecommendedLine1(),
      recommendedLine2: this.getRecommendedLine2(),
      callToActionTitle: this.getCallToActionTitle(),
      callToActionText: this.getCallToActionText(),
      callToActionButtonWrapperTitle: this.getCallToActionButtonWrapperTitle(),
      callToActionButtonWrapperText: this.getCallToActionButtonWrapperText(),
      callToActionFooterSiteDescription: this.getCallToActionFooterSiteDescription(),
      callToActionFooterTitle: this.getCallToActionFooterTitle(),
      callToActionFooterText: this.getCallToActionFooterText(),
      termsFooter: this.getTermsFooter(),
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
}
