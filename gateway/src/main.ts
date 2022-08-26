import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: '127.0.0.1',
      port: 6379,
    },
  });

  app.startAllMicroservices().then(() => {
    console.log('MICROSERVICE is running!');
  });

  app.listen(process.env.APP_PORT || 3000).then(() => {
    console.log('HTTP is running!');
  });
})();
