import { Injectable, Logger } from '@nestjs/common';
import {
  WebSocketServer,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: true,
  namespace: '/notify',
})
@Injectable()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger(AppGateway.name);

  handleConnection(client: Socket) {
    this.server.emit('notify', {
      connect: true,
      client: client.id,
    });

    this.logger.log(`Client Connection: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.server.emit('notify', {
      connect: false,
      client: client.id,
    });

    this.logger.log(`Client Disconnection: ${client.id}`);
  }

  publish(chanel: string, data: Record<string, unknown>) {
    this.server.emit(chanel, data);
  }
}
