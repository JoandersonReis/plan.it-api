import z from 'zod';

export const EmailSchema = z.email();
export const PasswordSchema = z
  .string()
  .min(8, { message: 'Senha tem que ter pelo menos 8 caracteres!' })
  .max(64, { message: 'Senha não pode ser muito longa!' })
  .regex(/(?=.*[a-z])/, {
    message: 'Senha tem que ter pelo menos uma letra minuscula!',
  })
  .regex(/(?=.*[A-Z])/, {
    message: 'Senha tem que ter pelo menos uma letra maiuscula!',
  })
  .regex(/(?=.*\d)/, { message: 'Senha tem que conter um número' })
  .regex(/(?=.*[^a-zA-Z0-9])/, {
    message: 'Senha tem que conter um caractere especial!',
  });
