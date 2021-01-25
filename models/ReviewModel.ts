import Model from '@models/Model';
import {
  ContentfulItem,
  ReviewFields,
  Review,
  Includes,
  ContentfulLink,
} from '@typedefs/app';

export default class ReviewModel extends Model<ReviewFields> {
  private data: ContentfulItem<ReviewFields>;

  constructor(entryLink: ContentfulLink, includes: Includes<ReviewFields>) {
    super(includes);
    this.data = this.getIncludedEntryById(entryLink.sys.id);
  }

  getPhone() {
    return this.data?.fields.phone || '';
  }

  getRating(): number {
    return this.data?.fields.rating || 1;
  }

  getVisitType(): string {
    return this.data?.fields.visitType || '';
  }

  getDuration(): string {
    return this.data?.fields.duration || '';
  }

  getContent(): string {
    return this.data?.fields.content || '';
  }

  getName(): string {
    return this.data?.fields.name || '';
  }

  getSerializable(): Review {
    return {
      rating: this.getRating(),
      visitType: this.getVisitType(),
      duration: this.getDuration(),
      content: this.getContent(),
      name: this.getName(),
      phone: this.getPhone(),
    };
  }
}
