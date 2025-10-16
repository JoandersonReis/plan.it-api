import { Module } from '@nestjs/common';
import CreateUserService from 'src/core/service/user/CreateUserService';
import LoginUserService from 'src/core/service/user/LoginUserService';
import { RefreshTokenService } from 'src/core/service/user/RefreshTokenService';
import { PrismaModule } from 'src/database/prisma/PrismaModule';
import { CreateUserController } from './CreateUserController';
import { LoginController } from './LoginController';
import { RefreshTokenController } from './RefreshTokenController';

@Module({
  imports: [PrismaModule],
  controllers: [CreateUserController, LoginController, RefreshTokenController],
  providers: [CreateUserService, LoginUserService, RefreshTokenService],
})
export class UserModule {}
