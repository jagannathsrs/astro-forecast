import { Injectable } from '@nestjs/common';

@Injectable()
export class ForecastService {

  async getLatLong(location: string): Promise<any>{
    let nodeGeocoder = require('node-geocoder');
    let options = {
      provider: 'openstreetmap'
    };
 
    let geoCoder = nodeGeocoder(options);
    let response = await geoCoder.geocode(location)
    let locationObject = (({latitude,longitude,formattedAddress}) => ({latitude,longitude,formattedAddress}))(response[0])

    return locationObject
  }

}
