import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';

import { Request, Response } from 'express';
import { Debt } from 'src/core/entity/Debt';
import {
  CreateDebtSchema,
  TCreateDebtSchema,
} from 'src/core/schema/debt/CreateDebtSchema';
import { CreateDebtService } from 'src/core/service/debt/CreateDebtService';
import { ZodValidationPipe } from 'src/pipe/ZodValidationPipe';
import { TException } from 'src/utils/types';

@Controller('/debt')
export class CreateDebtController {
  constructor(private readonly service: CreateDebtService) {}

  @UsePipes(new ZodValidationPipe(CreateDebtSchema))
  @Post()
  async handle(
    @Body() body: TCreateDebtSchema,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const debt = new Debt(
        body.title,
        new Date(body.commit),
        body.value,
        request.userId,
        body.repeat,
        body.paid,
      );
      const result = await this.service.execute(debt);

      return response.status(201).json(result);
    } catch (error: TException | any) {
      return response.status(error.statusCode || 500).json({
        errors: error.errors || {},
        message: error.message || 'Internal server error',
      });
    }
  }
}
