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

export interface EscortEntryFields {
  title: {
    'en-US': string;
  };
}

export class DataBuilder<T = any> {
  public data: AddEntryRequest<T> = { fields: {} as T };

  addTextField(
    name: string,
    value: string | string[] | number,
  ): DataBuilder<T> {
    this.data.fields[name] = {
      'en-US': value,
    };
    return this;
  }

  addObjectField(name: string, value: {}): DataBuilder<T> {
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
