import { createServer, Server as HttpServer } from 'http';
import express, { Express } from 'express';
import socketio, { Server as SocketioServer } from 'socket.io';
import { env } from '@team-app/shared-utils';
import { initRestApi } from './rest';
import { initSocketApi } from './socket';

enum ApiContainerState {
  Fresh, Prepared, Started
}

export class ApiContainer {
  private expressInst: Express = null;
  private http: HttpServer = null;
  private socketioInst: SocketioServer = null;

  private state: ApiContainerState = ApiContainerState.Fresh;
  
  private static resolveExposedPort(): number {
    return +(env.getters.getEnvNumber('API_REST_PORT') || 3000);
  }

  async prepare(): Promise<this> {
    if (this.state >= ApiContainerState.Prepared) {
      throw new Error('Api container is already prepared');
    }
    
    this.expressInst = express();
    this.http = createServer(this.expressInst);
    this.socketioInst = socketio(this.http);

    await Promise.all([
      initRestApi(this.expressInst),
      initSocketApi(this.socketioInst)
    ]);

    this.state = ApiContainerState.Prepared;

    return this;
  }

  async run(): Promise<void> {
    if (this.state < ApiContainerState.Prepared) {
      throw new Error('Api container is not ready to run');
    }
    if (this.state === ApiContainerState.Started) {
      throw new Error('Api container is already running');
    }

    await new Promise(done => this.http.listen(ApiContainer.resolveExposedPort(), done));
    this.state = ApiContainerState.Started;
  }
}
