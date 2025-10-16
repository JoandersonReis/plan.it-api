import { TDebtWithoutUser } from 'src/core/contract/user/types';

export type TDebtTemplate = {
  username: string;
  debt: TDebtWithoutUser[];
};
