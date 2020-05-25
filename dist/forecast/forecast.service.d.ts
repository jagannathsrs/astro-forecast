import { HttpService } from '@nestjs/common';
export declare class ForecastService {
    private http;
    constructor(http: HttpService);
    getLatLong(location?: string, lat?: number, lon?: number): Promise<any>;
    getForecast(locationObject: any): Promise<any>;
    extractData(response: any): Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;
    getMoonIllumination(date: any): Promise<string>;
}
