import {
  ContentfulItem,
  AboutUsInfoBlock,
  AboutUsInfoBlockFields,
} from "@typedefs/app";

export default class AboutUsInfoModel {
  constructor(private data: ContentfulItem<AboutUsInfoBlockFields>) {}

  getSerializable(): AboutUsInfoBlock {
    return {
      iconId: this.getIconId(),
      title: this.getTitle(),
      text: this.getText(),
    };
  }

  getIconId(): string {
    return this.data?.fields?.icon?.sys?.id;
  }

  getTitle(): string {
    return this.data?.fields?.title || "";
  }

  getText(): string {
    return this.data?.fields?.text || "";
  }
}
