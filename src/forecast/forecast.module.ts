import { Module } from '@nestjs/common';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';

@Module({
  imports: [],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
