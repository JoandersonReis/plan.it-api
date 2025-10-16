import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { DebtRepositoryContract } from 'src/core/contract/debt/DebtRepositoryContract';
import { SessionRepositoryContract } from 'src/core/contract/session/SessionRepositoryContract';
import UserRepositoryContract from 'src/core/contract/user/UserRepositoryContract';
import { DebtRepositoryPrisma } from './debt/DebtRepositoryPrisma';
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

    {
      provide: DebtRepositoryContract,
      useClass: DebtRepositoryPrisma,
    },
  ],
  exports: [
    UserRepositoryContract,
    SessionRepositoryContract,
    DebtRepositoryContract,
  ],
})
export class PrismaModule {}
