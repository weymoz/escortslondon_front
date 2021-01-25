export interface TextField {
  'en-US': string;
}

export interface LinkField {
  'en-US': {
    sys: {
      type: string;
      linkType: LinkType;
      id: string;
    };
  };
}

export type LinkType = 'Asset' | 'Entry';

export interface AddEntryRequest<T> {
  fields: T;
}

export abstract class DataBuilder<T> {
  public abstract data: AddEntryRequest<T>;

  addTextField(name: string, value: string): DataBuilder<T> {
    this.data.fields[name] = {
      'en-US': value,
    };
    return this;
  }

  addLinkField(
    name: string,
    value: string,
    linkType: LinkType = 'Asset',
  ): DataBuilder<T> {
    this.data.fields[name] = {
      'en-US': {
        sys: {
          type: 'Link',
          linkType,
          id: value,
        },
      },
    };
    return this;
  }

  addLinksArrayField(
    name: string,
    values: string[],
    linkType: LinkType = 'Asset',
  ): DataBuilder<T> {
    this.data.fields[name] = {
      'en-US': values.map(value => ({
        sys: {
          type: 'Link',
          linkType,
          id: value,
        },
      })),
    };
    return this;
  }
}
