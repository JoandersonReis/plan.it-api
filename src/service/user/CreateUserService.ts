import { Injectable } from '@nestjs/common';
import UserRepositoryContract from 'src/contract/user/UserRepositoryContract';
import { User } from 'src/entity/User';
import { Encode } from 'src/utils/Encode';
import { Exception } from 'src/utils/Exception';

@Injectable()
export default class CreateUserService {
  constructor(private readonly repository: UserRepositoryContract) {}

  public async execute(user: User) {
    const userExists = await this.repository.getByEmail(user.email);

    if (userExists) {
      throw Exception.execute('Usuário com esse email já existe!', 403);
    }

    const hash = Encode.hash(user.password);

    const userCreated = await this.repository.create({
      email: user.email,
      fullname: user.fullname,
      password: hash,
    });

    delete userCreated.password;

    return { user: userCreated };
  }
}
