import { Server, Socket } from 'socket.io';
import { env } from '@team-app/shared-utils';
import { actions, ApiSocketAction } from './actions';

const targetActions = {
  _cache: null,
  allowedActionsFilter(): (action: ApiSocketAction) => boolean {
    return env.isProduction()
      ? action => action.allowedInProduction
      : _ => true;
  },
  get() {
    return this._cache || (
      this._cache = actions.filter(this.allowedActionsFilter)
    );
  }
}

function bindActions(socket: Socket) {
  targetActions.get()
    .forEach(({ type, handler }) => socket.on(type, handler));
}

function unbindActions(socket: Socket) {
  targetActions.get()
    .forEach(({ type, handler }) => socket.off(type, handler));
}

export async function initSocketApi(app: Server) {
  app.on('connect', socket => {
    bindActions(socket);
    
    socket.on('disconnect', () => unbindActions(socket));
  });
}
