import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './controller/user/UserModule';
import { PrismaModule } from './database/prisma/PrismaModule';
import { EnsureUserAuthenticated } from './middleware/EnsureUserAuthenticated';
import { EnsureUserRefreshAuthenticated } from './middleware/EnsureUserRefeshAuthenticated';

@Module({
  imports: [
    // Entities modules
    UserModule,

    // Prisma modules
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureUserAuthenticated)
      .exclude(
        { path: '/user/login', method: RequestMethod.POST },
        { path: '/user', method: RequestMethod.POST },
        { path: '/user/auth/refresh', method: RequestMethod.POST },
      )
      .forRoutes('*');
    consumer
      .apply(EnsureUserRefreshAuthenticated)
      .forRoutes('/user/auth/refresh');
  }
}
