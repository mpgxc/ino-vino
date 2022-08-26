import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import configs from './config/configuration';

const logger = new Logger('Blog');

(async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: configs.redis.host,
        port: configs.redis.port,
      },
    },
  );

  app.listen().then(() => {
    logger.log('Microservice is listening');
  });
})();
