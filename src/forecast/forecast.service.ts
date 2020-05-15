import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ForecastService {

  constructor(private http: HttpService){}

  async getLatLong(location: string): Promise<object>{
    let nodeGeocoder = require('node-geocoder');
    let options = {
      provider: 'openstreetmap'
    };
 
    let geoCoder = nodeGeocoder(options);
    let response = await geoCoder.geocode(location)
    let locationObject = (({latitude,longitude,formattedAddress}) => ({latitude,longitude,formattedAddress}))(response[0])
    return locationObject;
  }

  async getForecast(locationObject): Promise<any>{
    let latitude = locationObject.latitude
    let longitude = locationObject.longitude
    let address = locationObject.formattedAddress
    console.log(address)
    const response = await this.http.get('http://www.7timer.info/bin/api.pl?lon='+longitude+'&lat='+latitude+'&product=astro&output=json').toPromise();
    const geoTz = require('geo-tz')

    const timeZone = geoTz(latitude,longitude)
    const dayOneData = (response.data['dataseries']).slice(6,10)
    const dayTwoData = (response.data['dataseries']).slice(14,18)
    const dayThreeData = (response.data['dataseries']).slice(22,26)

    var today = new Date();
    var tomorrow = new Date(new Date().setDate(today.getDate() + 1));
    var dayAfter = new Date(new Date().setDate(today.getDate() + 2));

    var forecastToday = this.constructForecastObject(address,today,timeZone[0],dayOneData,latitude,longitude)
    var forecastTomorrow = this.constructForecastObject(address,tomorrow,timeZone[0],dayTwoData,latitude,longitude)
    var forecastDayAfter = this.constructForecastObject(address,dayAfter,timeZone[0],dayThreeData,latitude,longitude)

    return [forecastToday,forecastTomorrow,forecastDayAfter]
  }

  calcAverage(data: any, property: string): any{
    //Calculates the average of the given property
    return (data.reduce((sum,data) => sum + data[property],0))/(data.length)
  }

  getMetric(cloudcover): string{
    if(cloudcover <= 2){
      return 'great!'
    }
    else if (cloudcover > 2 && cloudcover <= 5){
      return 'good'
    }

    else if (cloudcover > 5 && cloudcover <= 7){
      return 'bad'
    }

    else if (cloudcover > 7 && cloudcover <= 9){
      return 'nope'
    }
  }

  constructForecastObject(addr,date,tz,dayData,lat: number,long: number){
    var SunCalc = require('suncalc');

    const moonPhaseData = SunCalc.getMoonIllumination(date)
    const moonTimesData = SunCalc.getMoonTimes(date,lat,long)

    let cloudcover = this.calcAverage(dayData,'cloudcover');
    console.log(this.getMetric(cloudcover))
    return {
      address: addr,
      date: date.toLocaleString('en-US', { timeZone: tz }),
      metric: this.getMetric(cloudcover),
      cloudcover: cloudcover,
      seeing: this.calcAverage(dayData,'seeing'),
      transparency: this.calcAverage(dayData,'transparency'),
      moonIllumination: (moonPhaseData.fraction).toFixed(2),
      moonRiseTime: (moonTimesData.rise).toLocaleString('en-US', { timeZone: tz }),
      moonSetTime: (moonTimesData.set).toLocaleString('en-US', { timeZone: tz })
    }
  }


}
