import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const testFormSchema = z.object({
  name: z.string().min(1),
})
export type TestFormSchema = z.infer<typeof testFormSchema>

export const GetAuthenticatedUserResponseSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    roleId: z.string(),
    isVerified: z.boolean(),
});

export type GetAuthenticatedUserResponse = z.infer<
    typeof GetAuthenticatedUserResponseSchema
>;

export const LoginResponseSchema = z.object({
    user: GetAuthenticatedUserResponseSchema,
    access_token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RegisterResponseSchema = z.object({
    user: GetAuthenticatedUserResponseSchema,
    access_token: z.string(),
});

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

export const LoginSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export type LoginRequest = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    password2: z.string(),
    firstname: z.string(),
    lastname: z.string(),
});

export type RegisterRequest = z.infer<typeof RegisterSchema>;

export type ReservationResponse = {
  id: string;
  createdAt: string;
  email: string;
  firstname: string;
  lastname: string;
  reservationDate: string;
}

export const insertReservationSchema = z.object({
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    reservationDate: z.string(),
});
export type InsertReservationSchema = z.infer<typeof insertReservationSchema>