import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const testFormSchema = z.object({
  name: z.string().min(1),
})
export type TestFormSchema = z.infer<typeof testFormSchema>