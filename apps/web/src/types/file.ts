import { z } from "zod";

export const FileSchema = z.object({
  file: z.object({
    name: z.string(),
    type: z.string().regex(/image\/(jpeg|png)/), // For example, validating only JPEG and PNG images
    size: z.number().max(5000000), // For example, ensuring file size is under 5MB
  }),
});

export type TFile = z.infer<typeof FileSchema>;
