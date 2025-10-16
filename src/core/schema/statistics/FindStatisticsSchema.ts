import z from 'zod';

export const FindStatisticsSchema = z.object({
  month: z
    .string()
    .min(1, 'Mês tem que ser maior ou igual a 1')
    .max(2, 'Mês tem que ser menor ou igual a 12'),
});

export type TFindStatisticsSchema = z.infer<typeof FindStatisticsSchema>;
