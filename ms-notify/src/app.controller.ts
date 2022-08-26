import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppGateway } from 'app.gateway';
import { AppService } from 'app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appGateway: AppGateway,
  ) {}

  @EventPattern('command-created')
  async subscribe(data: Record<string, unknown>) {
    this.appGateway.publish('notify', data);

    this.appService.publish({
      message: 'command-created:finish',
      data,
    });
  }
}
