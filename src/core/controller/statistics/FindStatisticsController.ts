import { Controller, Get, Param, Req, Res, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  FindStatisticsSchema,
  TFindStatisticsSchema,
} from 'src/core/schema/statistics/FindStatisticsSchema';
import FindStatisticsService from 'src/core/service/statistics/FindStatisticsService';
import { ZodValidationPipe } from 'src/pipe/ZodValidationPipe';
import { TException } from 'src/utils/types';

@Controller('/statistics')
export default class FindStatisticsController {
  constructor(private readonly service: FindStatisticsService) {}

  @UsePipes(new ZodValidationPipe(FindStatisticsSchema))
  @Get(':month')
  public async execute(
    @Param() params: TFindStatisticsSchema,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.execute(
        Number(params.month),
        request.userId,
      );

      return response.status(201).json(result);
    } catch (error: TException | any) {
      return response.status(error.statusCode || 500).json({
        errors: error.errors || {},
        message: error.message || 'Internal server error',
      });
    }
  }
}
