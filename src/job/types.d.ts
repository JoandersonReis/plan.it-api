import { TDebtWithoutUser } from 'src/contract/user/types';

export type TDebtTemplate = {
  username: string;
  debt: TDebtWithoutUser[];
};
