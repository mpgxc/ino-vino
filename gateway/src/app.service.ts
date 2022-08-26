import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject(String(process.env.ALT_SERVICE_NAME)) private client: ClientProxy,
  ) {}

  async publish(data: Record<string, unknown>) {
    return this.client.emit('command-created', data);
  }
}
