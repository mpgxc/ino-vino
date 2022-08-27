import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppGateway } from 'app.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configs from './config/configuration';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: configs.services.msNotify,
        transport: Transport.REDIS,
        options: configs.redisOptions,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
