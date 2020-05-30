import { Module,HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({  isGlobal: true,   envFilePath: 'config.env',})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
