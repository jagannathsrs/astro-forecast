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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const forecast_service_1 = require("./forecast.service");
let ForecastController = class ForecastController {
    constructor(ForecastService) {
        this.ForecastService = ForecastService;
    }
    async getForecast(location, lat, lon) {
        if (!location && (!lat || !lon)) {
            throw new common_1.HttpException('Location or lat and lon required', common_1.HttpStatus.BAD_REQUEST);
        }
        console.log(location);
        let locationObject = await this.ForecastService.getLatLong(location, lat, lon);
        console.log(locationObject);
        if (locationObject == '') {
            throw new common_1.HttpException('Ivalid location name', common_1.HttpStatus.BAD_REQUEST);
        }
        let forecastObject = this.ForecastService.getForecast(locationObject);
        return forecastObject;
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('location')), __param(1, common_1.Query('lat')), __param(2, common_1.Query('lon')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ForecastController.prototype, "getForecast", null);
ForecastController = __decorate([
    common_1.Controller('forecast'),
    __metadata("design:paramtypes", [forecast_service_1.ForecastService])
], ForecastController);
exports.ForecastController = ForecastController;
//# sourceMappingURL=forecast.controller.js.map