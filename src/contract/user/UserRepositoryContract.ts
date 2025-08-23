import { TUserCreateData, TUserDatabase } from './types';

export default abstract class UserRepositoryContract {
  public abstract create(data: TUserCreateData): Promise<TUserDatabase>;

  public abstract getOne(id: string): Promise<TUserDatabase | null>;

  public abstract getByEmail(email: string): Promise<TUserDatabase | null>;
}
