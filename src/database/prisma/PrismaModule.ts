import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SessionRepositoryContract } from 'src/contract/session/SessionRepositoryContract';
import UserRepositoryContract from 'src/contract/user/UserRepositoryContract';
import { SessionRepositoryPrisma } from './session/SessionRepositoryPrisma';
import UserRepositoryPrisma from './user/UserRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepositoryContract,
      useClass: UserRepositoryPrisma,
    },

    {
      provide: SessionRepositoryContract,
      useClass: SessionRepositoryPrisma,
    },
  ],
  exports: [UserRepositoryContract, SessionRepositoryContract],
})
export class PrismaModule {}
