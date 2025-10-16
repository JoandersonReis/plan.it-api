import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { Email } from 'src/core/entity/Email';
import { User } from 'src/core/entity/User';
import {
  CreateUserSchema,
  TCreateUserSchema,
} from 'src/core/schema/user/CreateUserSchema';
import CreateUserService from 'src/core/service/user/CreateUserService';
import { ZodValidationPipe } from 'src/pipe/ZodValidationPipe';
import { TException } from 'src/utils/types';

@Controller('/user')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  public async handle(
    @Body() body: TCreateUserSchema,
    @Res() response: Response,
  ) {
    const { fullname, email, password } = body;

    try {
      const user = new User(fullname, new Email(email), password);

      const userCreated = await this.service.execute(user);

      return response.status(201).json(userCreated);
    } catch (error: TException | any) {
      return response
        .status(error.status || 400)
        .json({ message: error.message, errors: error.errors || null });
    }
  }
}
