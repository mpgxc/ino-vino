import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import configs from './config/configuration';

@Injectable()
export class AppService {
  constructor(@Inject(configs.services.msNotify) private client: ClientProxy) {}

  async publish(data: Record<string, unknown>) {
    return this.client.emit('command-created:finish', data);
  }
}
