import { TUserDatabase } from '../user/types';

export type TDebtCreateData = {
  title: string;
  commit: Date;
  value: string;
  repeat?: boolean;
  userId: string;
  paid?: boolean;
};

export type TDebtFind = {
  pages: number;
  debts: TDebtDatabase[];
};

export type TDebtDatabase = TDebtCreateData & {
  id: string;
  createdAt: Date;
  user?: TUserDatabase;
  repeat: boolean;
  paid: boolean;
};
