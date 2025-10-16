import { Email } from 'src/core/entity/Email';
import { Password } from 'src/core/entity/Password';

export type TLoginCreateData = {
  email: Email;
  password: Password;
  ip: string;
};
