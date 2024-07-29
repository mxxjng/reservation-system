import { FastAverageColor } from "fast-average-color";
import { injectable } from "inversify";
import { nanoid } from "nanoid";
import sharp from "sharp";
import { ImageObjectSchema } from "~/server/db/schema";

const fac = new FastAverageColor();

/* Service class for the image upload business logic */
@injectable()
export class ImageService {
  constructor() {}

  /** Get the uri of a base64 image */
  getImageUriFromBase64(imageBase64: string) {
    const uri = imageBase64.split(";base64,").pop();

    if (!uri) {
      throw new Error("Failed to convert imageBase64 to uri");
    }

    return uri;
  }

  /** Upload image to ionos object storage after converting it to an png file */
  async uploadImage(imageBase64: string, imageFolder: string) {
    const uri = this.getImageUriFromBase64(imageBase64);

    const avifImageBuffer = await sharp(Buffer.from(uri, "base64"))
      .toFormat("avif", { quality: 100 })
      .avif()
      .toBuffer();

    // TODO: replace default folder with env path
    return {
      file: avifImageBuffer,
      fileName: nanoid(24),
      folder: `defaultfolder/${imageFolder}/`,
    };
  }

  /* Deletes an image from ionos object storage */
  async deleteImage(id: string) {
    console.log("delete image", id);
  }

  /** Extract the average color of the image */
  async getColor(imageBase64: string) {
    const uri = this.getImageUriFromBase64(imageBase64);

    const { data } = await sharp(Buffer.from(uri, "base64"))
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer({ resolveWithObject: true });

    return fac.getColorFromArray4(data);
  }

  /** Generate hex color value from rgb values */
  rgba2hex(rgb1: number, rgb2: number, rgb3: number) {
    const hex =
      (rgb1 | (1 << 8)).toString(16).slice(1) +
      (rgb2 | (1 << 8)).toString(16).slice(1) +
      (rgb3 | (1 << 8)).toString(16).slice(1);

    return `#${hex}`;
  }

  checkIfImageNeedsToBeUploaded(image: ImageObjectSchema) {
    if (!image.imageBase64) return false;

    if (image.imagePath && image.imagePath.startsWith("blob")) return true;

    return false;
  }
}
