import { TException } from './types';

export class Exception extends Error {
  public static execute(
    message: string,
    statusCode: number,
    errors?: any,
  ): TException {
    return { message, statusCode, errors };
  }
}
