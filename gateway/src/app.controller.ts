import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('notify')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/publish-event')
  async publish(@Body() payload: any) {
    this.appService.publish(payload);
  }

  @EventPattern('command-created:finish')
  async subscribe(data: Record<string, unknown>) {
    console.log(data);
  }
}
