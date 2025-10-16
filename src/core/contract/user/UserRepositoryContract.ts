import { TUserCreateData, TUserDatabase, TUserWithDebt } from './types';

export default abstract class UserRepositoryContract {
  public abstract create(data: TUserCreateData): Promise<TUserDatabase>;

  public abstract getOne(id: string): Promise<TUserDatabase | null>;

  public abstract findByCommit(
    commit: Date,
    repeat: boolean,
  ): Promise<TUserWithDebt[]>;

  public abstract getByEmail(email: string): Promise<TUserDatabase | null>;
}
