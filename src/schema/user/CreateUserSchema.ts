import z from 'zod';
import { EmailSchema, PasswordSchema } from '../GlobalSchema';

export const CreateUserSchema = z.object({
  fullname: z.string().min(4, 'Nome completo é obrigatório!').toLowerCase(),
  email: EmailSchema,
  password: PasswordSchema,
});

export type TCreateUserSchema = z.infer<typeof CreateUserSchema>;
