import { ContentfulItem, AssetFields, Includes } from "@typedefs/app";

export default class Model<T> {
  constructor(protected includes: Includes<T>) {}

  protected getIncludedEntryById(id: string): ContentfulItem<T> | undefined {
    return this.includes?.Entry?.find((entry) => entry.sys.id === id);
  }

  protected getIncludedAssetById(
    id: string
  ): ContentfulItem<AssetFields> | undefined {
    return this.includes?.Asset?.find((entry) => entry.sys.id === id);
  }
}
