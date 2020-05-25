import { Module,HttpModule } from '@nestjs/common';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({  isGlobal: true,   envFilePath: 'config.env',})],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
