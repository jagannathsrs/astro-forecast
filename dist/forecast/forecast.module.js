"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const forecast_controller_1 = require("./forecast.controller");
const forecast_service_1 = require("./forecast.service");
const config_1 = require("@nestjs/config");
let ForecastModule = class ForecastModule {
};
ForecastModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule, config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: 'config.env', })],
        controllers: [forecast_controller_1.ForecastController],
        providers: [forecast_service_1.ForecastService],
    })
], ForecastModule);
exports.ForecastModule = ForecastModule;
//# sourceMappingURL=forecast.module.js.map