import { Email } from 'src/entity/Email';
import { Password } from 'src/entity/Password';

export type TLoginCreateData = {
  email: Email;
  password: Password;
  ip: string;
};
