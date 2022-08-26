import { Injectable } from '@nestjs/common';
import {
  WebSocketServer,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  async handleConnection() {
    this.server.emit('notify', {
      connect: true,
    });
  }

  async handleDisconnect() {
    this.server.emit('notify', {
      disconnect: true,
    });
  }

  async publish(chanel: string, data: Record<string, unknown>) {
    this.server.emit(chanel, data);
  }
}
