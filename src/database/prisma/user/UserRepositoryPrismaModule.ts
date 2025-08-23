import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import UserRepositoryContract from 'src/contract/user/UserRepositoryContract';
import UserRepositoryPrisma from './UserRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepositoryContract,
      useClass: UserRepositoryPrisma,
    },
  ],
  exports: [UserRepositoryContract],
})
export class UserRepositoryPrismaModule {}
