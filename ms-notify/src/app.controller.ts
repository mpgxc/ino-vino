import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from 'app.service';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('command-created')
  async subscribe(data: Record<string, unknown>) {
    console.log(data);

    await delay(3000);

    this.appService.publish({
      message: 'command-created:finish',
      data,
    });
  }
}
