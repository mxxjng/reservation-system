import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstname: z.string(),
  lastname: z.string(),
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;
