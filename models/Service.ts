import { ContentfulItem, ServiceFields, Service } from "@typedefs/app";
export default class ServiceModel {
  constructor(private data: ContentfulItem<ServiceFields>) {}

  getSerializable(): Service {
    return {
      title: this.getTitle(),
      slug: this.getSlug(),
      description: this.getDescription(),
      titleMetaTag: this.getTitleMetaTag(),
      metaDescriptionTag: this.getMetaDescrriptionTag(),
      galleryLine1: this.getGalleryLine(1),
      galleryLine2: this.getGalleryLine(2),
      galleryLine3: this.getGalleryLine(3),
    };
  }

  getTitle(): string {
    return this.data?.fields.title || "";
  }

  getSlug(): string {
    return this.data?.fields.slug || "";
  }

  getDescription(): string {
    return this.data?.fields.description || "";
  }

  getTitleMetaTag(): string {
    return this.data?.fields.titleMetaTag || "";
  }

  getMetaDescrriptionTag(): string {
    return this.data?.fields.metaDescriptionTag || "";
  }

  getGalleryLine(n: number): string {
    const key = `galleryLine${n}`;
    return this.data.fields[key] || "";
  }
}
