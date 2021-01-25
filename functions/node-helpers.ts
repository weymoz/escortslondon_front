import { ContentfulItem, AssetFields } from "@typedefs/app";
import ImageEditor from "./ImageEditor";
import path from "path";
import Jimp from "jimp";

const LOGO_VERTICAL = path.join(process.cwd(), "functions/logo-vertical.png");
const LOGO_HORIZONTAL = path.join(
  process.cwd(),
  "functions/logo-horizontal.png"
);

const IMG_PUBLIC_FOLDER = "gallery";
const IMG_SAVE_PATH = path.join(process.cwd(), "public", IMG_PUBLIC_FOLDER);

export const _addWatermarks = async (
  assets: ContentfulItem<AssetFields>[]
): Promise<ContentfulItem<AssetFields>[]> => {
  const wmAssets: ContentfulItem<AssetFields>[] = [];

  const logoHorizontal = await Jimp.read(LOGO_HORIZONTAL);
  const logoVertical = await Jimp.read(LOGO_VERTICAL);

  const promises = assets.slice(0, 1).map(async (asset, index) => {
    if (asset.fields.file.contentType !== "image/jpeg") return;

    const assetUrl = `https:${asset.fields.file.url}`;

    try {
      const imageEditor = new ImageEditor(
        assetUrl,
        logoHorizontal,
        logoVertical
      );

      console.log(`Applying watermark to ${assetUrl}`);

      await imageEditor.init();

      imageEditor.addWatermark();

      //const savePath = path.join(IMG_SAVE_PATH, asset.fields.file.fileName);
      //imageEditor.saveImage(savePath);

      /*
      wmAssets.push({
        ...asset,
        fields: {
          ...asset.fields,
          file: {
            ...asset.fields.file,
            url: await imageEditor.getDataUrl(),
          },
        },
      });
      */

      assets[0].fields.file.url = await imageEditor.getDataUrl();

      console.log(`Watermark added to ${asset.fields.file.url}`);
    } catch (e) {
      console.error(e);
    }
  });

  await Promise.all(promises);

  return wmAssets;
};

export const addWatermarks = async (assets: ContentfulItem<AssetFields>[]) => {
  const logoHorizontal = await Jimp.read(LOGO_HORIZONTAL);
  const logoVertical = await Jimp.read(LOGO_VERTICAL);

  if (assets[0].fields.file.contentType !== "image/jpeg") return;

  const assetUrl = `https:${assets[0].fields.file.url}`;

  try {
    const imageEditor = new ImageEditor(assetUrl, logoHorizontal, logoVertical);

    console.log(`Applying watermark to ${assetUrl}`);

    await imageEditor.init();

    imageEditor.addWatermark();

    assets[0].fields.file.url = await imageEditor.getDataUrl();

    console.log(`Watermark added to ${assetUrl}`);
  } catch (e) {
    console.error(e);
  }

  //await Promise.all(promises);

  //return wmAssets;
};

export const getTitleFromSlug = (slug: string): string =>
  `${slug[0].toUpperCase()}${slug.slice(1)}`;
