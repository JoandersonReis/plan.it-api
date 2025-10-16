import z from 'zod';
import { EmailSchema, PasswordSchema } from '../GlobalSchema';

export const LoginUserSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type TLoginUserSchema = z.infer<typeof LoginUserSchema>;
