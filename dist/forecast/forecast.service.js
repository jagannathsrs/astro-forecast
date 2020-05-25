"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let ForecastService = class ForecastService {
    constructor(http) {
        this.http = http;
    }
    async getLatLong(location, lat, lon) {
        let nodeGeocoder = require('node-geocoder');
        let options = {
            provider: 'openstreetmap'
        };
        let geoCoder = nodeGeocoder(options);
        if (lat && lon) {
            try {
                let response = await geoCoder.reverse({ lat: lat, lon: lon });
                return (({ latitude, longitude, formattedAddress }) => ({ latitude, longitude, formattedAddress }))(response[0]);
            }
            catch (_a) {
                throw new common_1.HttpException('Ivalid lat lon coordinates', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else if (location) {
            try {
                let response = await geoCoder.geocode(location);
                return (({ latitude, longitude, formattedAddress }) => ({ latitude, longitude, formattedAddress }))(response[0]);
            }
            catch (_b) {
                throw new common_1.HttpException('Ivalid location', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async getForecast(locationObject) {
        const axios = require('axios');
        let latitude = locationObject.latitude;
        let longitude = locationObject.longitude;
        let address = locationObject.formattedAddress;
        let appKey = process.env.APP_KEY;
        let appID = process.env.APP_ID;
        console.log(appID, appKey);
        try {
            const response = await axios.get('http://api.weatherunlocked.com/api/forecast/' + latitude + ',' + longitude, {
                params: {
                    app_id: appID,
                    app_key: appKey
                }
            });
            let temp = await this.extractData(response.data['Days']);
            return {
                address: address,
                forecast: temp
            };
        }
        catch (error) {
            throw new common_1.HttpException('Missing API keys or weatherunlocked is down', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async extractData(response) {
        let forecast = await response.map(async (val) => {
            var moment = require('moment');
            let cloudcover = await (val.Timeframes).map((val) => {
                return {
                    time: val.time,
                    cover: val.cloudtotal_pct
                };
            });
            return {
                date: moment(val.date, 'D/M/YYYY'),
                sunrise: val.sunrise_time,
                sunset: val.sunrise_time,
                moonrise: val.moonrise_time,
                moonset: val.moonset_time,
                moonillumination: await this.getMoonIllumination(val.date),
                cloudcover: cloudcover
            };
        });
        return Promise.all(forecast);
    }
    async getMoonIllumination(date) {
        var SunCalc = require('suncalc');
        var moment = require('moment');
        var unixTimestamp = moment(date, 'D/M/YYYY').valueOf();
        let fraction = await (SunCalc.getMoonIllumination(unixTimestamp)).fraction;
        return (fraction * 100).toFixed(0);
    }
};
ForecastService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], ForecastService);
exports.ForecastService = ForecastService;
//# sourceMappingURL=forecast.service.js.map