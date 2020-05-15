import { Controller, Get, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly ForecastService: ForecastService) {}

  @Get()
  async getForecast(@Query('location') location: string): Promise<any> {

    if(location == ''){
      throw new HttpException('Location name required', HttpStatus.BAD_REQUEST);
    }

    let locationObject: any = await this.ForecastService.getLatLong(location);
    
    if(locationObject == ''){
      throw new HttpException('Ivalid location name', HttpStatus.BAD_REQUEST);
    }
    let forecastObject = this.ForecastService.getForecast(locationObject);
    
    return forecastObject;

  }
}
