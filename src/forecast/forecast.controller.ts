import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly ForecastService: ForecastService) {}

  @Get()
  async getForecast(@Query('location') location: string): Promise<any> {
    let locationObject: any = await this.ForecastService.getLatLong(location);
    let forecastObject = this.ForecastService.getForecast(locationObject);
    
    return forecastObject;

  }
}
