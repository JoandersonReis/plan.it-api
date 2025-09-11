import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DebtModule } from './controller/debt/DebtModule';
import { UserModule } from './controller/user/UserModule';
import { PrismaModule } from './database/prisma/PrismaModule';
import { DebtReportJob } from './job/DebtReportJob';
import { EnsureUserAuthenticated } from './middleware/EnsureUserAuthenticated';
import { EnsureUserRefreshAuthenticated } from './middleware/EnsureUserRefeshAuthenticated';

@Module({
  imports: [
    // Queue Redis
    BullModule.registerQueue({
      name: 'mail',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    // Entities modules
    UserModule,
    DebtModule,

    // Prisma modules
    PrismaModule,
  ],
  controllers: [],
  providers: [DebtReportJob],
  exports: [DebtReportJob],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureUserAuthenticated)
      .exclude(
        { path: '/user/auth', method: RequestMethod.POST },
        { path: '/user', method: RequestMethod.POST },
        { path: '/user/auth/refresh', method: RequestMethod.POST },
      )
      .forRoutes('*');
    consumer
      .apply(EnsureUserRefreshAuthenticated)
      .forRoutes('/user/auth/refresh');
  }
}
