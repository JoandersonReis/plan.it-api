import { Module } from '@nestjs/common';
import { UserModule } from './controller/user/UserModule';
import { UserRepositoryPrismaModule } from './database/prisma/user/UserRepositoryPrismaModule';

@Module({
  imports: [
    // Entities modules
    UserModule,

    // Prisma modules
    UserRepositoryPrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
