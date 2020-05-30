import { Controller, Get, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly AppService: AppService) {}

  @Get()
  async getForecast(@Query('location') location: string, @Query('lat') lat: number, @Query('lon') lon: number): Promise<any> {

    console.log(location)
    if(!location && (!lat || !lon)){
      throw new HttpException('Location or lat and lon required', HttpStatus.BAD_REQUEST);
    }
    console.log('Getting lat long')
    let locationObject: any = await this.AppService.getLatLong(location,lat,lon);
    console.log('lat long is' + locationObject)
    if(locationObject == ''){
      throw new HttpException('Ivalid location name', HttpStatus.BAD_REQUEST);
    }
    console.log('Getting forecast')
    let forecastObject = this.AppService.getForecast(locationObject);
    console.log('forecast is'+forecastObject)

    return forecastObject;

  }
}
