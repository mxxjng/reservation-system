import { ImageObjectSchema } from "~/server/db/schema";

/* Function to check if an imagebase64 exists and needs to be uploaded */
export function checkIfImageNeedsToBeUploaded(image: ImageObjectSchema) {
  if (!image.imageBase64) return false;

  if (image.imagePath && image.imagePath.startsWith("blob")) return true;

  return false;
}
