import { TPaginationData } from '../types';
import { TDebtCreateData, TDebtDatabase, TDebtFind } from './types';

export abstract class DebtRepositoryContract {
  public abstract find(
    userId: string,
    pagination?: TPaginationData,
  ): Promise<TDebtFind>;

  public abstract findById(id: string, userId: string): Promise<TDebtDatabase>;

  public abstract create(data: TDebtCreateData): Promise<TDebtDatabase>;

  public abstract update(
    id: string,
    data: Partial<TDebtCreateData>,
  ): Promise<TDebtDatabase>;

  public abstract delete(id: string, userId: string): Promise<TDebtDatabase>;
}
