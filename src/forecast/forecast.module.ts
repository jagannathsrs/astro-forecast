import { Module,HttpModule } from '@nestjs/common';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';

@Module({
  imports: [HttpModule],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
