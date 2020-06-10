import { Controller, Get, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly AppService: AppService) {}

  @Get()
  async getForecast(@Query('location') location: string, @Query('lat') lat: number, @Query('lon') lon: number): Promise<any> {

    if(!location && (!lat || !lon)){
      throw new HttpException('Location or lat and lon required', HttpStatus.BAD_REQUEST);
    }
    let locationObject: any = await this.AppService.getLatLong(location,lat,lon);
    if(locationObject == ''){
      throw new HttpException('Ivalid location name', HttpStatus.BAD_REQUEST);
    }
    let forecastObject = this.AppService.getForecast(locationObject);

    return forecastObject;

  }
}
