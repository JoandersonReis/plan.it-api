import { TSessionCreateData, TSessionDatabase } from './types';

export abstract class SessionRepositoryContract {
  public abstract create(data: TSessionCreateData): Promise<TSessionDatabase>;

  public abstract getByRefresh(
    token: string,
    ip: string,
  ): Promise<TSessionDatabase | null>;

  public abstract getById(
    id: string,
    ip: string,
  ): Promise<TSessionDatabase | null>;

  public abstract getByUserId(
    userId: string,
    ip: string,
  ): Promise<TSessionDatabase[] | null>;

  public abstract getByAccess(
    token: string,
    ip: string,
  ): Promise<TSessionDatabase | null>;

  public abstract update(
    sessionId: string,
    data: Partial<TSessionCreateData>,
  ): Promise<TSessionDatabase | null>;

  public abstract delete(
    sessionId: string,
    ip: string,
  ): Promise<TSessionDatabase | null>;

  public abstract active(
    sessionId: string,
    active: boolean,
  ): Promise<TSessionDatabase>;
}
