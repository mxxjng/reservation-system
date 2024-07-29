/* eslint-disable no-bitwise */
import { FastAverageColor } from "fast-average-color";
import { nanoid } from "nanoid";
import sharp from "sharp";

const fac = new FastAverageColor();

/** Get the uri of a base64 image */
export const getImageUriFromBase64 = (imageBase64: string) => {
  const uri = imageBase64.split(";base64,").pop();

  if (!uri) {
    throw new Error("Failed to convert imageBase64 to uri");
  }
  return uri;
};

/** Upload image to ionos object storage after converting it to an png file */
export const uploadImage = async (imageBase64: string, imageFolder: string) => {
  const uri = getImageUriFromBase64(imageBase64);

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
};

/** Extract the average color of the image */
export const getColor = async (imageBase64: string) => {
  const uri = getImageUriFromBase64(imageBase64);

  const { data } = await sharp(Buffer.from(uri, "base64"))
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: "inside" })
    .toBuffer({ resolveWithObject: true });

  return fac.getColorFromArray4(data);
};

/** Generate hex color value from rgb values */
export const rgba2hex = (rgb1: number, rgb2: number, rgb3: number) => {
  const hex =
    (rgb1 | (1 << 8)).toString(16).slice(1) +
    (rgb2 | (1 << 8)).toString(16).slice(1) +
    (rgb3 | (1 << 8)).toString(16).slice(1);

  return `#${hex}`;
};
