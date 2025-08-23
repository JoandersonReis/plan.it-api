import { Module } from '@nestjs/common';
import { UserRepositoryPrismaModule } from 'src/database/prisma/user/UserRepositoryPrismaModule';
import CreateUserService from 'src/service/user/CreateUserService';
import LoginUserService from 'src/service/user/LoginUserService';
import { CreateUserController } from './CreateUserController';
import { LoginController } from './LoginController';

@Module({
  imports: [UserRepositoryPrismaModule],
  controllers: [CreateUserController, LoginController],
  providers: [CreateUserService, LoginUserService],
})
export class UserModule {}
