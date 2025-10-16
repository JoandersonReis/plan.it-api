import { Exception } from 'src/utils/Exception';

export class Debt {
  constructor(
    private _title: string,
    private _commit: Date,
    private _value: string,
    private _userId: string,
    private _repeat: boolean = false,
    private _paid: boolean = false,
  ) {
    this.validateCommit(this._commit);
  }

  public validateCommit(commit: Date, repeat?: boolean) {
    if (repeat) {
      return;
    }

    if (commit.getTime() < new Date().getTime()) {
      throw Exception.execute('Data de execução não pode ser no passado!', 400);
    }
  }

  public get commit() {
    return this._commit;
  }

  public get repeat() {
    return this._repeat;
  }

  public getValues() {
    return {
      title: this._title,
      commit: this._commit,
      value: this._value,
      userId: this._userId,
      repeat: this._repeat,
      paid: this._paid,
    };
  }
}
