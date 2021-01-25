import Jimp from "jimp";

enum Alignment {
  PORTRAIT = "portraight",
  LANDSCAPE = "landscape",
}
const LOGO_OPACITY = 0.4;

export default class ImageEditor {
  image: Jimp = null;
  logo: Jimp = null;

  constructor(
    private inputImagePath: string,
    private logoHorizontal: Jimp,
    private logoVertical: Jimp
  ) {}

  async init() {
    try {
      this.image = await Jimp.read(this.inputImagePath);

      this.logo =
        this.alignment === Alignment.LANDSCAPE
          ? this.logoHorizontal
          : this.logoVertical;
    } catch (e) {
      console.error(e);
    }
  }

  get alignment(): Alignment {
    return this.image.bitmap.width > this.image.bitmap.height
      ? Alignment.LANDSCAPE
      : Alignment.PORTRAIT;
  }

  addWatermark() {
    this.resizeLogo();
    this.image.composite(this.logo, 0, this.getLogoYcoord(), {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: LOGO_OPACITY,
      opacityDest: 1,
    });
  }

  private getLogoYcoord(): number {
    return this.alignment === Alignment.LANDSCAPE
      ? this.image.bitmap.height - this.logo.bitmap.height
      : 0;
  }

  private resizeLogo() {
    if (this.alignment === Alignment.LANDSCAPE) {
      this.logo.resize(this.image.bitmap.width, Jimp.AUTO);
    } else {
      this.logo.resize(Jimp.AUTO, this.image.bitmap.height);
    }
  }

  saveImage(path: string): Promise<Jimp> {
    return this.image.writeAsync(path);
  }

  getDataUrl(): Promise<string> {
    return this.image.getBase64Async(Jimp.MIME_JPEG);
  }
}
