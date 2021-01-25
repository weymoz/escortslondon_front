import { ContentfulItem, FaqItem, FaqItemFields } from "@typedefs/app";

export default class FaqItemModel {
  constructor(private data: ContentfulItem<FaqItemFields>) {}
  getSerializable(): FaqItem {
    return {
      question: this.getQuestion(),
      answer: this.getAnswer(),
    };
  }

  getQuestion(): string {
    return this.data.fields.question || "";
  }

  getAnswer(): string {
    return this.data.fields.answer || "";
  }
}
