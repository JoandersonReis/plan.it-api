import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RefreshTokenService } from 'src/core/service/user/RefreshTokenService';
import { TException } from 'src/utils/types';

@Controller('/user/')
export class RefreshTokenController {
  constructor(private readonly service: RefreshTokenService) {}

  @Post('/auth/refresh')
  public async handle(@Req() request: Request, @Res() response: Response) {
    try {
      const result = await this.service.execute(
        request.sessionId,
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
