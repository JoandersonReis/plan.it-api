import z from 'zod';

export const CreateDebtSchema = z.object({
  title: z.string().min(2, 'Campo title precisa de pelo menos 2 caracteres!'),
  commit: z.string().refine((item) => new Date(item)),
  value: z.string().min(1, 'Campo value é Obrigatório!'),
  repeat: z.boolean().optional(),
  paid: z.boolean().optional(),
});

export type TCreateDebtSchema = z.infer<typeof CreateDebtSchema>;
