import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { Email } from 'src/entity/Email';
import { Password } from 'src/entity/Password';
import { ZodValidationPipe } from 'src/pipe/ZodValidationPipe';
import {
  LoginUserSchema,
  TLoginUserSchema,
} from 'src/schema/user/LoginUserSchema';
import LoginUserService from 'src/service/user/LoginUserService';
import { TException } from 'src/utils/types';

@Controller('/user')
export class LoginController {
  constructor(private readonly service: LoginUserService) {}

  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  @Post('/auth')
  public async handle(
    @Body() body: TLoginUserSchema,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.execute({
        email: new Email(body.email),
        password: new Password(body.password),
      });

      return response.status(200).json(result);
    } catch (error: TException | any) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Internal server error',
        errors: error.errors || null,
      });
    }
  }
}
