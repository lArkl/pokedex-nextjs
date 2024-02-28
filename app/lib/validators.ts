import { z } from "zod";

export const signUpSchema = z
  .object({
    firstname: z
      .string({ required_error: "Firstname is required" })
      .min(3, "Firstname must have at least 3 characters"),
    lastname: z
      .string({ required_error: "Lastname is required" })
      .min(3, "Lastname must have at least 3 characters"),
    email: z.string({ required_error: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const pokemonsParamsSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().int().optional().default(1),
  "abilities[]": z.coerce.number().int().array().optional(),
  "types[]": z.coerce.number().int().array().optional(),
});

export type PokemonsParamsSchema = z.infer<typeof pokemonsParamsSchema>;
