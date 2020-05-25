import { Controller, Get, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly ForecastService: ForecastService) {}

  @Get()
  async getForecast(@Query('location') location: string, @Query('lat') lat: number, @Query('lon') lon: number): Promise<any> {

    if(!location && (!lat || !lon)){
      throw new HttpException('Location or lat and lon required', HttpStatus.BAD_REQUEST);
    }
    console.log(location)
    let locationObject: any = await this.ForecastService.getLatLong(location,lat,lon);
    console.log(locationObject)
    
    if(locationObject == ''){
      throw new HttpException('Ivalid location name', HttpStatus.BAD_REQUEST);
    }
    let forecastObject = this.ForecastService.getForecast(locationObject);

    return forecastObject;

  }
}
