import { Exception } from 'src/utils/Exception';

export class Email {
  private email: string;

  constructor(email: string) {
    this.validate(email);

    this.email = email;
  }

  private validate(value: string) {
    const regex =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;

    if (!regex.test(value)) {
      throw Exception.execute('E-mail inválido', 400);
    }
  }

  public getValue(): string {
    return this.email;
  }
}
