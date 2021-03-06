import { Injectable, HttpService,HttpException,HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(private http: HttpService){}

  async getLatLong(location?: string, lat?: number, lon?: number): Promise<any>{
    try{
      let nodeGeocoder = require('node-geocoder');
      let options = {
      provider: 'openstreetmap'
      };
      var geoCoder = nodeGeocoder(options);
    }catch(err){
    }
    if(lat && lon){
      try{
        let response = await geoCoder.reverse({lat: lat, lon: lon})
        return (({latitude,longitude,formattedAddress}) => ({latitude,longitude,formattedAddress}))(response[0])
      }catch{
        throw new HttpException('Ivalid lat lon coordinates', HttpStatus.BAD_REQUEST);
      }
    }
      else if(location){
        try{
          let response = await geoCoder.geocode(location)
          return (({latitude,longitude,formattedAddress}) => ({latitude,longitude,formattedAddress}))(response[0])
        }catch{
          throw new HttpException('Ivalid location', HttpStatus.BAD_REQUEST);
        }
    }
  
  }

  async getForecast(locationObject): Promise<any>{

    const axios = require('axios');

    let latitude = locationObject.latitude
    let longitude = locationObject.longitude
    let address = locationObject.formattedAddress

    let appKey = process.env.APP_KEY;
    let appID = process.env.APP_ID;

    try{
    const response = await axios.get('http://api.weatherunlocked.com/api/forecast/'+latitude+','+longitude, {
      params: {
      app_id: appID,
      app_key: appKey
      } 
    })
      let temp = await this.extractData(response.data['Days'])
      return {
        address: address,
        lat: latitude,
        lon: longitude,
        forecast: temp
      };

    }catch (error) {
      throw new HttpException('Missing API keys or weatherunlocked is down', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async extractData(response){
    let forecast = await response.map(async (val) => {
    let moment = require('moment')

      let cloudcover =  (val.Timeframes).map( (val) => {
        return {
        time: this.formatTime(val.time),
        cover: val.cloudtotal_pct
        }
      })

      return {
        date: moment(val.date,'D/M/YYYY').format('dddd, MMMM Do'),
        sunrise: val.sunrise_time,
        sunset: val.sunrise_time,
        moonrise: val.moonrise_time,
        moonset: val.moonset_time,
        moonillumination: await this.getMoonIllumination(val.date),
        cloudcover: cloudcover
      }
    });
    return Promise.all(forecast)
  }

  async getMoonIllumination(date){

    var SunCalc = require('suncalc');
    var moment = require('moment')
    var unixTimestamp = moment(date, 'D/M/YYYY').valueOf();

    let fraction = await (SunCalc.getMoonIllumination(unixTimestamp)).fraction

    return (fraction*100).toFixed(0)
  }
  formatTime(time){
    const moment = require('moment')

    if((String(time)).length === 3){
      return moment.utc(time,'hmm').format('HH:mm')
    }
    else{
      return moment.utc(time,'hhmm').format('HH:mm')

    }
  }
}
