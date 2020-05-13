import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly ForecastService: ForecastService) {}

  @Get()
  getForecast(@Query('location') location: string): any {
    let locationObject = this.ForecastService.getLatLong(location);

    return locationObject;

  }
}
