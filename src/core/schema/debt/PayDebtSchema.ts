import z from 'zod';

export const PayDebtSchema = z.object({
  paid: z.boolean(),
  debtId: z.uuid(),
});

export type TPayDebtSchema = z.infer<typeof PayDebtSchema>;
