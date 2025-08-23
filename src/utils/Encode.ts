import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class Encode {
  public static hash(password: string): string {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return hash;
  }

  public static verify(password: string, hash: string): boolean {
    const approved = compareSync(password, hash);

    return approved;
  }
}
