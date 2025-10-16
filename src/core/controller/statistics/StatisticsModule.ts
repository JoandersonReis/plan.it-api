import { Module } from '@nestjs/common';
import FindStatisticsService from 'src/core/service/statistics/FindStatisticsService';
import { PrismaModule } from 'src/database/prisma/PrismaModule';
import FindStatisticsController from './FindStatisticsController';

@Module({
  imports: [PrismaModule],
  controllers: [FindStatisticsController],
  providers: [FindStatisticsService],
})
export class StatisticsModule {}
