import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForecastModule } from './forecast/forecast.module';

@Module({
  imports: [ForecastModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
