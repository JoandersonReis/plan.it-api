import { TDebtDatabase } from '../debt/types';

export type TUserCreateData = {
  fullname: string;
  email: string;
  password: string;
};

export type TUserDatabase = TUserCreateData & {
  id: string;
  balance: string;
  createdAt: Date;
};

type TDebtWithoutUser = Omit<TDebtDatabase, 'user'>;

export type TUserWithDebt = TUserDatabase & {
  Debt: TDebtWithoutUser[];
};
