import { Body, Controller, Patch, Req, Res, UsePipes } from '@nestjs/common';

import { Request, Response } from 'express';
import {
  PayDebtSchema,
  TPayDebtSchema,
} from 'src/core/schema/debt/PayDebtSchema';
import PayDebtService from 'src/core/service/debt/PayDebtService';
import { ZodValidationPipe } from 'src/pipe/ZodValidationPipe';
import { TException } from 'src/utils/types';

@Controller('/debts')
export class PayDebtController {
  constructor(private readonly service: PayDebtService) {}

  @UsePipes(new ZodValidationPipe(PayDebtSchema))
  @Patch('/pay')
  async handle(
    @Body() body: TPayDebtSchema,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      await this.service.execute(body.paid, body.debtId, request.userId);

      return response.status(201).json();
    } catch (error: TException | any) {
      return response.status(error.statusCode || 500).json({
        errors: error.errors || {},
        message: error.message || 'Internal server error',
      });
    }
  }
}
