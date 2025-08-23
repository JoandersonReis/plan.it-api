import { Email } from './Email';

export class User {
  constructor(
    private _fullname: string,
    private _email: Email,
    private _password: string,
    private id?: string,
    private _balance?: string,
    private createdAt?: Date,
  ) {}

  get email(): string {
    return this._email.getValue();
  }

  get fullname(): string {
    return this._fullname;
  }

  get password(): string {
    return this._password;
  }

  getValues() {
    return {
      id: this.id,
      fullname: this._fullname,
      email: this._email.getValue(),
      password: this._password,
      balance: this._balance,
      createdAt: this.createdAt,
    };
  }
}
