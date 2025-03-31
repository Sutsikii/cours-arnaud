import { z } from "zod";

export const contactSchema = z.object({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères"),
  email: z.string()
    .email("L'email n'est pas valide")
    .min(1, "L'email est requis"),
  message: z.string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(500, "Le message ne doit pas dépasser 500 caractères"),
  phone: z.string()
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Le numéro de téléphone n'est pas valide")
    .optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>; 