import { FilterApiEscortFields, EscortFiltered } from '@typedefs/app';
export default class EscortFilteredModel {
  constructor(private data: FilterApiEscortFields) {}

  getSerializable(): EscortFiltered {
    return {
      id: this.getId(),
      title: this.getTitle(),
      location: this.getLocation(),
      incallRate: this.getIncallRate(),
      outcallRate: this.getOutcallRate(),
      thumbnail: this.getThumbnail(),
      newTag: this.getNewTag(),
      recommendedTag: this.getRecommendedTag(),
      slug: this.getSlug(),
    };
  }

  getTitle() {
    return this.data.title || '';
  }
  getThumbnail() {
    return this.data.imageUrl || '';
  }
  getIncallRate() {
    return this.data.incallRate?.toString() || '';
  }
  getOutcallRate() {
    return this.data.outcallRate?.toString() || '';
  }
  getLocation() {
    return this.data.location || '';
  }
  getSlug() {
    return this.data.title?.toLowerCase() || '';
  }
  getId() {
    return this.data.id || '';
  }

  getNewTag() {
    return this.data.newTag || false;
  }

  getRecommendedTag() {
    return this.data.recommendedTag || false;
  }
}
