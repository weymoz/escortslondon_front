import Model from "./Model";
import {
  FaqItemFields,
  FaqItem,
  ContentfulItem,
  FaqPageSettings,
  ContentfulLink,
  FaqPageSettingsResponse,
} from "@typedefs/app";
import FaqItemModel from "./FaqItemModel";

export default class FaqPageSettingsModel extends Model<FaqItemFields> {
  constructor(private data: FaqPageSettingsResponse) {
    super(data.includes);
  }

  getSerializable(): FaqPageSettings {
    return {
      headerTitle: this.getHeaderTitle(),
      headerSubtitle: this.getHeaderSubtitle(),
      headerText: this.getHeaderText(),
      questions: this.getQuestions(),
      titleMetaTag: this.getTitleMetaTag(),
      metaDescriptionTag: this.getMetaDescriptionTag(),
    };
  }

  getQuestions(): FaqItem[] {
    const faqItems = this.data.items[0]?.fields?.questions?.map(
      (faqItemLink, id) => {
        const foundEntry = this.getQuestion(faqItemLink);
        if (foundEntry) {
          const faqItem = new FaqItemModel(foundEntry).getSerializable();
          faqItem.id = id.toString();
          return faqItem;
        }
      }
    );
    return faqItems ? faqItems.filter((faqItem) => !!faqItem) : [];
  }

  getQuestion(link: ContentfulLink): ContentfulItem<FaqItemFields> {
    return this.getIncludedEntryById(link.sys.id);
  }

  getHeaderTitle(): string {
    return this.data.items[0]?.fields?.headerTitle || "";
  }

  getHeaderSubtitle(): string {
    return this.data.items[0]?.fields?.headerSubtitle || "";
  }

  getHeaderText(): string {
    return this.data.items[0]?.fields?.headerText || "";
  }

  getTitleMetaTag(): string {
    return this.data.items[0]?.fields?.titleMetaTag || "";
  }

  getMetaDescriptionTag(): string {
    return this.data.items[0]?.fields?.metaDescriptionTag || "";
  }
}
