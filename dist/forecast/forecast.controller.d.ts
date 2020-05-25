import { ForecastService } from './forecast.service';
export declare class ForecastController {
    private readonly ForecastService;
    constructor(ForecastService: ForecastService);
    getForecast(location: string, lat: number, lon: number): Promise<any>;
}
