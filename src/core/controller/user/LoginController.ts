import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { Email } from 'src/core/entity/Email';
import { Password } from 'src/core/entity/Password';
import {
  LoginUserSchema,
  TLoginUserSchema,
} from 'src/core/schema/user/LoginUserSchema';
import LoginUserService from 'src/core/service/user/LoginUserService';
import { SessionRepositoryPrisma } from 'src/database/prisma/session/SessionRepositoryPrisma';
import { ZodValidationPipe } from 'src/pipe/ZodValidationPipe';
import { TException } from 'src/utils/types';

@Controller('/user')
export class LoginController {
  constructor(private readonly service: LoginUserService) {}

  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  @Post('/auth')
  public async handle(
    @Body() body: TLoginUserSchema,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const ip =
        request.headers['x-forwarded-for'] || request.socket.remoteAddress;

      const result = await this.service.execute({
        email: new Email(body.email),
        password: new Password(body.password),
        ip: ip as string,
      });

      return response.status(200).json(result);
    } catch (error: TException | any) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Internal server error',
        errors: error.errors || null,
      });
    }
  }

  @Patch('/logout')
  public async logout(@Req() request: Request, @Res() response: Response) {
    try {
      const sessionRepo = new SessionRepositoryPrisma(new PrismaService());
      await sessionRepo.active(request.sessionId, false);

      return response.status(201).json();
    } catch (error: TException | any) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Internal server error',
        errors: error.errors || null,
      });
    }
  }
}
