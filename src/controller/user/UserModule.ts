import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/PrismaModule';
import CreateUserService from 'src/service/user/CreateUserService';
import LoginUserService from 'src/service/user/LoginUserService';
import { RefreshTokenService } from 'src/service/user/RefreshTokenService';
import { CreateUserController } from './CreateUserController';
import { LoginController } from './LoginController';
import { RefreshTokenController } from './RefreshTokenController';

@Module({
  imports: [PrismaModule],
  controllers: [CreateUserController, LoginController, RefreshTokenController],
  providers: [CreateUserService, LoginUserService, RefreshTokenService],
})
export class UserModule {}
