import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configs from './config/configuration';
import { Logger } from '@nestjs/common';

const logger = new Logger('gateway');

(async () => {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: configs.redis.host,
      port: configs.redis.port,
    },
  });

  app.startAllMicroservices().then(() => {
    logger.log('MICROSERVICE is running!');
  });

  app.listen(process.env.APP_PORT || 3000).then(() => {
    logger.log('HTTP is running!');
  });
})();
