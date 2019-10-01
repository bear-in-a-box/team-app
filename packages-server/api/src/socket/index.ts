import { Server } from 'socket.io';
import { ApiSocketActions } from './actions';
import { actionset } from './actionset';

export async function initSocketApi(app: Server) {
  app.on('connect', socket => {
    const actions = new ApiSocketActions(socket, actionset).bind();

    socket.on('disconnect', () => actions.unbind());
  });
}
